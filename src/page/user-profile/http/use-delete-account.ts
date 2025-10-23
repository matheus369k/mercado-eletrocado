import { axiosBackEndAPI } from '@/lib/axios';
import { COOKIES_KEYS } from '@/util/const';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import cookies from 'js-cookie';

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const authorizationToken = cookies.get(COOKIES_KEYS.AUTHORIZATION_TOKEN);
        if (!authorizationToken) {
          throw new Error('User not have authorization');
        }

        await axiosBackEndAPI.delete('/users', {
          headers: {
            Authorization: 'Bearer '.concat(authorizationToken),
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-user', 'user-account', 'user-authorization'],
      });
    },
  });
};
