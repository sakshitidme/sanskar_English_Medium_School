import axios from 'axios';

const testLocalOTP = async () => {
    const url = 'http://localhost:5001/api/otp/send-otp';
    const payload = {
        phone: '9970412559',
        name: 'Sakshi'
    };

    console.log('Testing Local API:', url);
    console.log('Payload:', payload);

    try {
        const response = await axios.post(url, payload);
        console.log('Status:', response.status);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Error Status:', error.response.status);
            console.error('Error Response:', error.response.data);
        }
    }
};

testLocalOTP();
