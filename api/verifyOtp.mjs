import axios from '@/utilities/axios';

export const verifyOtp = async (payload) => {
  try {
    const response = await axios.get(`reset/verifyOTP/${payload}`);
    return response.data;
  } catch (error) {
    return {
      status: 'fail',
    };
  }
};
