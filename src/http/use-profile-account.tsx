import { axiosBackEndAPI } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type UserProfileResponse = {
  avatar: string | null;
  email: string;
  name: string;
  cep: string;
  id: string;
};

export const useProfileAccount = () => {
  return useQuery({
    queryKey: ['get-user', 'user-account', 'user-authorization'],
    queryFn: async () => {
      const response = await axiosBackEndAPI
        .get('/api/users/profile', {
          withCredentials: true,
        })
        .catch(async (error) => {
          if (error.status === 401) {
            const result = await axiosBackEndAPI.get('/token', {
              withCredentials: true,
            });

            if (result.status === 200) {
              return axiosBackEndAPI.get('/api/users/profile', {
                withCredentials: true,
              });
            }
          }
        });

      const result: UserProfileResponse = await response.data;
      if (!result) {
        throw new Error('Not found user account');
      }

      return result;
    },
  });
};
