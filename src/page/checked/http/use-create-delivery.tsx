import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type UseCreateDeliveriesProductsRequest = {
  productId: string;
  price: number;
  image: string;
  name: string;
}[];

export const useCreateDeliveriesProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UseCreateDeliveriesProductsRequest) => {
      await axiosBackEndAPI
        .post('/api/products/delivery', data, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .catch(async (error) => {
          if (error.status !== 401) return error;
          const responseToken = await axiosBackEndAPI.get('/token', {
            withCredentials: true,
          });

          if (responseToken.status !== 200) return error;
          return await axiosBackEndAPI.post('/api/products/delivery', data, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['deliveries-products', 'all-deliveries-products'],
      });
    },
  });
};
