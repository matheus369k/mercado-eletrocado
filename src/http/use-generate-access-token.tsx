import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useGenerateAccessToken = () => {
  return useMutation({
    mutationKey: ['generate-new-access-token'],
    mutationFn: async () => {
      return await axiosBackEndAPI.get('/token', {
        withCredentials: true,
      });
    },
  });
};
