import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      await axiosBackEndAPI
        .patch('/api/users/update', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        })
        .catch(async (error) => {
          if (error.status !== 401) return error;
          const responseToken = await axiosBackEndAPI.get('/token', {
            withCredentials: true,
          });

          if (responseToken.status !== 200) return error;
          return await axiosBackEndAPI.patch('/api/users/update', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          });
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-user', 'user-account', 'user-authorization'],
      });
    },
  });
};
