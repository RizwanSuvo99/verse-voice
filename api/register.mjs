import axios from 'axios';

const registerUser = async (data) => {
  const url = `${process.env.NEXT_PUBLIC_TEST_API_URL}/register`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return error.response ? error.response.data : error.message;
  }
};

export default registerUser;
