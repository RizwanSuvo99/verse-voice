import axios from '@/utilities/axios';

// Step 1: Send OTP to email
export const sendRegistrationOtp = async (data) => {
  try {
    const response = await axios.post('/register/send-otp', data);
    return response.data;
  } catch (error) {
    return {
      status: 'fail',
      message: error.response?.data?.message || 'Failed to send OTP',
    };
  }
};

// Step 2: Verify OTP and complete registration
export const verifyRegistrationOtp = async (data) => {
  try {
    const response = await axios.post('/register/verify-otp', data);
    return response.data;
  } catch (error) {
    return {
      status: 'fail',
      message: error.response?.data?.message || 'Failed to verify OTP',
    };
  }
};

// Resend OTP
export const resendRegistrationOtp = async (email) => {
  try {
    const response = await axios.post('/register/resend-otp', { email });
    return response.data;
  } catch (error) {
    return {
      status: 'fail',
      message: error.response?.data?.message || 'Failed to resend OTP',
    };
  }
};
