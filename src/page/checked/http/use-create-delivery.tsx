import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type UseCreateDeliveriesProductsRequest = {
  price: number;
  image: string;
  name: string;
}[];

export const useCreateDeliveriesProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UseCreateDeliveriesProductsRequest) => {
      const deliveriesProducts = data.map((product) => {
        return {
          ...product,
          price: Number((product.price % 1).toFixed(2)) * 100 + Math.floor(product.price) * 100,
        };
      });

      await axiosBackEndAPI
        .post('/api/products/delivery', deliveriesProducts, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .catch(async (error) => {
          if (error.status === 401) {
            const result = await axiosBackEndAPI.get('/token', {
              withCredentials: true,
            });

            if (result.status === 200) {
              await axiosBackEndAPI.post('/api/products/delivery', deliveriesProducts, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            }
          }
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['deliveries-products', 'all-deliveries-products'],
      });
    },
  });
};
