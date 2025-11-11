import { axiosBackEndAPI } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type UseDeliveriesProductResponse = {
  deliveryDate: string;
  productId: string;
  price: number;
  image: string;
  name: string;
  id: string;
}[];

export const useGetAllDeliveriesProduct = () => {
  return useQuery({
    queryKey: ['deliveries-products', 'all-deliveries-products'],
    queryFn: async () => {
      const response = await axiosBackEndAPI
        .get('/api/products/delivery', {
          withCredentials: true,
        })
        .catch(async (error) => {
          if (error.status === 401) {
            const result = await axiosBackEndAPI.get('/token', {
              withCredentials: true,
            });

            if (result.status === 200) {
              return await axiosBackEndAPI.get('/api/products/delivery', {
                withCredentials: true,
              });
            }
          }
        });

      const result: UseDeliveriesProductResponse = await response.data;
      if (!result[0]) {
        throw new Error('Not found Deliveries products');
      }

      return result;
    },
  });
};
