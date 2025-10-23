import { axiosBackEndAPI } from '@/lib/axios';
import { COOKIES_KEYS } from '@/util/const';
import cookies from 'js-cookie';
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
    staleTime: 1000 * 60 * 60 * 24,
    queryKey: ['get-user', 'user-account', 'user-authorization'],
    queryFn: async () => {
      try {
        const authorizationToken = cookies.get(COOKIES_KEYS.AUTHORIZATION_TOKEN);
        if (!authorizationToken) {
          throw new Error('User not have authorization');
        }

        const response = await axiosBackEndAPI.get('/users/profile', {
          headers: {
            Authorization: 'Bearer '.concat(authorizationToken),
          },
        });
        const result: UserProfileResponse = await response.data;

        if (!result) {
          throw new Error('Not found user account');
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
