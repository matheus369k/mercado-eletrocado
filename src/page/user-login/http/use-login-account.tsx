import type { UserLoginType } from '@/@types/user-schema';
import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

type UserLoginResponse = {
  user: {
    avatar: string | null;
    email: string;
    name: string;
    cep: string;
    id: string;
  };
  token: string;
};

export const useLoginAccount = () => {
  return useMutation({
    mutationFn: async (data: UserLoginType) => {
      try {
        const { auto_connection, email, password } = data;
        const response = await axiosBackEndAPI.post(
          '/users/login',
          {
            stayConnected: auto_connection,
            password,
            email,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const result: UserLoginResponse = await response.data;

        if (!result) {
          throw new Error('Error try maker login of the user account');
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
