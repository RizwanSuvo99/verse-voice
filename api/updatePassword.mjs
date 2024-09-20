import axios from '@/utilities/axios';

export const updatePassword = async (payload) => {
  try {
    const response = await axios.post(`reset/resetPass`, payload);
    return response.data;
  } catch (error) {
    return {
      status: 'fail',
    };
  }
};
