import type { UserRegisterType } from '@/@types/user-schema';
import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

type UserRegisterResponse = {
  user: {
    avatar: string | null;
    email: string;
    name: string;
    cep: string;
    id: string;
  };
  token: string;
};

export const useRegisterAccount = () => {
  return useMutation({
    mutationFn: async (data: Omit<UserRegisterType, 'agree_terms'>) => {
      try {
        const { auto_connection, cep, email, full_name, password } = data;
        const response = await axiosBackEndAPI.post(
          '/users/register',
          {
            stayConnected: auto_connection,
            name: full_name,
            password,
            email,
            cep,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const result: UserRegisterResponse = await response.data;

        if (!result) {
          throw new Error('Error try create user account');
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
