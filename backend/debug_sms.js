import axios from 'axios';

const testSMS = async () => {
    const phone = '9970412559';
    const name = 'Sakshi';
    const displayName = name || 'User';
    const otp = '123456';
    const templateId = '1707177530128300775';
    const entityId = '1001717826564432844';
    const headerId = '1705177495671539548';
    const message = `Hi ${displayName},Your login OTP is ${otp}\nSanskar English Medium School\nTeam BK Educational and Welfare Society.`;
    
    const username = encodeURIComponent('bkeducation@999');
    const pass = encodeURIComponent('Intel@2026');
    const encodedMessage = encodeURIComponent(message);
    
    // Using redundant parameters with prioritization to enforce the Sanskar School template
    const smsApiUrl = `https://www.smsjust.com/sms/user/urlsms.php?username=${username}&pass=${pass}&dest_mobileno=91${phone}&message=${encodedMessage}&senderid=BKEWSN&msgtype=TXT&templateid=${templateId}&entityid=${entityId}&headerid=${headerId}&response=Y`;

    console.log('--- Final DLT SMS Test ---');
    console.log('Testing URL:', smsApiUrl);

    try {
        const response = await axios.get(smsApiUrl);
        console.log('Status:', response.status);
        console.log('Response Data:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

testSMS();
