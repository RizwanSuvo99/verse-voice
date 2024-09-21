import { axiosPrivate } from '@/utilities/axios';

export const logOut = async () => {
  try {
    const response = await axiosPrivate.post(`/logout`);
    return response;
  } catch (error) {
    return {
      status: 'fail',
    };
  }
};
