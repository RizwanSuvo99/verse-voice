import axios from '@/utilities/axios';

export const loginUser = async (data) => {
  try {
    const response = await axios.post('/auth', data);
    return response.data;
  } catch (error) {
    return {
      status: 'fail',
      message: error?.response?.data?.message,
    };
  }
};
