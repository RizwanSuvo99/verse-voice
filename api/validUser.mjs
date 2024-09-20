import axios from '@/utilities/axios';

export const validUser = async (email) => {
  console.log(email);
  try {
    const response = await axios.get(`/reset/verifyEmail/${email}`);
    return response.data;
  } catch (error) {
    return {
      status: 'fail',
    };
  }
};
