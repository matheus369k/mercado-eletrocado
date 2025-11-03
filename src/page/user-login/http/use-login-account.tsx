import type { UserLoginType } from '@/@types/user-schema';
import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useLoginAccount = () => {
  return useMutation({
    mutationFn: async (data: UserLoginType) => {
      const { auto_connection, email, password } = data;
      await axiosBackEndAPI.post(
        '/api/users/login',
        {
          stayConnected: auto_connection,
          password,
          email,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    },
  });
};
