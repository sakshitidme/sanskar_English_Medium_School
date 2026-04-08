import axios from 'axios';

const API_URL = 'http://localhost:5001/api/otp';
const phone = '919970412559'; // User's requested number with 91 prefix

const testOTP = async () => {
  try {
    // 1. Send OTP
    console.log(`Sending OTP to ${phone}...`);
    const sendRes = await axios.post(`${API_URL}/send-otp`, { phone });
    console.log('Send OTP Response:', sendRes.data);

    // 2. Verify OTP (Manually check DB or wait for SMS)
    // Abhi ke liye hum assume karte hai ki hume OTP mil gaya hai
    // Aap MongoDB Compass me 'otps' collection check karke wahan se OTP nikal sakte hain
    
    // const otp = '123456'; // Jo OTP DB me dikhe wo yahan likhein
    // const verifyRes = await axios.post(`${API_URL}/verify-otp`, { phone, otp });
    // console.log('Verify OTP Response:', verifyRes.data);

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

testOTP();
