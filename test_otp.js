import axios from 'axios';

const testOTP = async () => {
    const phone = '9970412559'; // User's phone from screenshot
    const name = 'Sakshi';
    const otp = '123456';
    const displayName = name || 'User';
    const templateId = '1707177530128300775';
    const peId = '1001717826564432844';
    const headerId = '1705177495671539548';
    const message = `Hi ${displayName},Your login OTP is ${otp}\nSanskar English Medium School\nTeam BK Educational and Welfare Society.`;
    
    // Test the URL construction and the API call with mandatory template_id
    const smsApiUrl = `https://www.smsjust.com/sms/user/urlsms.php?username=bkeducation@999&pass=Intel@2026&dest_mobileno=${phone}&message=${encodeURIComponent(message)}&senderid=BKEWSN&msgtype=TXT&templateid=${templateId}&entityid=${peId}&headerid=${headerId}&response=Y`;

    console.log('Testing URL:', smsApiUrl);

    try {
        const response = await axios.get(smsApiUrl);
        console.log('Status:', response.status);
        console.log('Response Data:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Error Response:', error.response.data);
        }
    }
};

testOTP();
