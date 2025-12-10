import type { UserRegisterType } from '@/@types/user-schema';
import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useRegisterAccount = () => {
  return useMutation({
    mutationFn: async (data: Omit<UserRegisterType, 'agree_terms'>) => {
      const { auto_connection, cep, email, full_name, password } = data;
      return await axiosBackEndAPI.post(
        '/api/users/register',
        {
          stayConnected: auto_connection,
          name: full_name,
          password,
          email,
          cep,
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
