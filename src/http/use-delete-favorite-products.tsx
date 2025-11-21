import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

type UseDeleteFavoriteProductRequest = {
  productId: string;
};

export const useDeleteFavoriteProduct = () => {
  return useMutation({
    mutationFn: async ({ productId }: UseDeleteFavoriteProductRequest) => {
      await axiosBackEndAPI
        .delete(`/api/products/favorite/${productId}`, {
          withCredentials: true,
        })
        .catch(async (error) => {
          if (error.status !== 401) return error;
          const result = await axiosBackEndAPI.get('/token', {
            withCredentials: true,
          });

          if (result.status !== 200) return error;
          await axiosBackEndAPI.delete(`/api/products/favorite/${productId}`, {
            withCredentials: true,
          });
        });
    },
  });
};
