import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogoutAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const responseLogout = await axiosBackEndAPI
        .delete('/api/users/logout', {
          withCredentials: true,
        })
        .catch(async (error) => {
          if (error.status !== 401) return error;
          const responseToken = await axiosBackEndAPI.get('/token', {
            withCredentials: true,
          });

          if (responseToken.status !== 200) return error;
          return await axiosBackEndAPI.delete('/api/users/logout', {
            withCredentials: true,
          });
        });

      if (responseLogout.status === 200) {
        await axiosBackEndAPI.delete('/token', {
          withCredentials: true,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-user', 'user-account', 'user-authorization'],
      });
    },
  });
};
