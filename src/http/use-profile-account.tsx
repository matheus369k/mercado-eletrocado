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
  return useQuery<UserProfileResponse>({
    queryKey: ['get-user', 'user-account', 'user-authorization'],
    experimental_prefetchInRender: true,
    queryFn: async () => {
      const response = await axiosBackEndAPI
        .get('/api/users/profile', {
          withCredentials: true,
        })
        .catch(async (error) => {
          if (error.status !== 401) return error;
          const result = await axiosBackEndAPI.get('/token', {
            withCredentials: true,
          });

          if (result.status !== 200) return error;
          return axiosBackEndAPI.get('/api/users/profile', {
            withCredentials: true,
          });
        });

      return await response.data;
    },
  });
};
