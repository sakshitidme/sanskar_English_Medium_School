import OTP from '../models/OTP.js';
import axios from 'axios';

export const sendOTP = async (req, res) => {
  const { phone, name } = req.body;

  if (!phone || phone.length < 10) {
    return res.status(400).json({ message: 'Invalid phone number' });
  }

  try {
    console.log('Checking for existing OTP cooldown...');
    const existingOTP = await OTP.findOne({ phone });
    if (existingOTP) {
      const timeDiff = (Date.now() - existingOTP.createdAt) / 1000;
      if (timeDiff < 180) {
        return res.status(429).json({ 
          success: false, 
          message: `Please wait ${Math.ceil(180 - timeDiff)} seconds before requesting a new OTP.` 
        });
      }
    }

    console.log('Generating OTP for:', phone);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log('Updating DB with OTP...');
    await OTP.findOneAndUpdate(
      { phone },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );
    console.log('DB updated successfully.');

    // Add 91 prefix if not present for Indian numbers (10 digits)
    const formattedPhone = phone.length === 10 ? `91${phone}` : phone;
    const displayName = name || 'User';
    
    // Environment variables for DLT compliance
    const templateId = process.env.SMS_TEMPLATE_ID;
    const peId = process.env.SMS_ENTITY_ID;
    const username = process.env.SMS_USERNAME;
    const password = process.env.SMS_PASSWORD;
    const senderId = process.env.SMS_SENDER_ID;
    const headerId = process.env.SMS_HEADER_ID;

    // CRITICAL: MANDATORY TEMPLATE ID CHECK
    if (!templateId || templateId === 'undefined') {
      console.error('CRITICAL ERROR: SMS_TEMPLATE_ID is missing in environment variables.');
      return res.status(500).json({ success: false, message: 'SMS Configuration Error: Template ID Missing' });
    }

    // STRICT APPROVED TEMPLATE (Updated to User-Requested 3-Line Format)
    // Line 1: Hi {Name},Your login OTP is {OTP}
    // Line 2: Sanskar English Medium School
    // Line 3: Team BK Educational and Welfare Society.
    const message = `Hi ${displayName},Your login OTP is ${otp}\nSanskar English Medium School\nTeam BK Educational and Welfare Society.`;
    
    // Hard Enforcement: Verify message structure matches DLT patterns
    const dltPattern = /^Hi .*,Your login OTP is \d{6}\nSanskar English Medium School\nTeam BK Educational and Welfare Society\.$/;
    if (!dltPattern.test(message)) {
      console.error('CRITICAL: Message mismatch with DLT pattern. SMS ABORTED.');
      console.error('Offending Message:', message.replace(/\n/g, '\\n'));
      return res.status(500).json({ success: false, message: 'Message Template Mismatch Protection Error' });
    }

    console.log('--- SMS REQUEST LOG ---');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Phone:', formattedPhone);
    console.log('Template ID:', templateId);
    console.log('Entity ID (PE ID):', peId);
    console.log('Message Content:', message);
    console.log('------------------------');

    // Properly encode parameters
    const encodedMessage = encodeURIComponent(message);
    const encodedUsername = encodeURIComponent(username);
    const encodedPassword = encodeURIComponent(password);
    
    // Strict transactional API URL construction (using non-underscored parameters as requested)
    const smsApiUrl = `https://www.smsjust.com/sms/user/urlsms.php?username=${encodedUsername}&pass=${encodedPassword}&dest_mobileno=${formattedPhone}&message=${encodedMessage}&senderid=${senderId}&msgtype=TXT&templateid=${templateId}&entityid=${peId}&headerid=${headerId}&response=Y`;

    console.log('Final API Request URL:', smsApiUrl);

    const response = await axios.get(smsApiUrl, {
      timeout: 15000,
      headers: { 
        'Connection': 'close',
        'Cache-Control': 'no-cache'
      }
    });

    console.log('--- SMS PROVIDER RESPONSE ---');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    console.log('-----------------------------');

    if (response.data && response.data.toLowerCase().includes('err')) {
      console.warn('SMS Provider returned an error:', response.data);
      return res.status(500).json({ 
        success: false, 
        message: 'SMS provider error', 
        details: response.data 
      });
    }

    res.status(200).json({ success: true, message: 'OTP sent successfully', providerResponse: response.data });
  } catch (error) {
    console.error('Detailed Error sending OTP:', error.message);
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: 'Phone and OTP are required' });
  }

  try {
    const otpData = await OTP.findOne({ phone, otp });

    if (otpData) {
      // Delete OTP after successful verification
      await OTP.deleteOne({ _id: otpData._id });
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(200).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};
