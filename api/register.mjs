import axios from '@/utilities/axios';

export const registerUser = async (data) => {
  try {
    const response = await axios.post('/register', data);
    return response.data;
  } catch (error) {
    return {
      status: 'fail',
    };
  }
};
