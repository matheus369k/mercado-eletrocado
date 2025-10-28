import { axiosBackEndAPI } from '@/lib/axios';
import { COOKIES_KEYS } from '@/util/const';
import cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';

type UseDeliveriesProductResponse = {
  deliveryDate: string;
  price: number;
  image: string;
  name: string;
  id: string;
}[];

export const useGetAllDeliveriesProduct = () => {
  return useQuery({
    queryKey: ['deliveries-products', 'all-deliveries-products'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      try {
        const authorizationToken = cookies.get(COOKIES_KEYS.AUTHORIZATION_TOKEN);
        if (!authorizationToken) {
          throw new Error('User not have authorization');
        }

        const response = await axiosBackEndAPI.get(`/products/delivery`, {
          headers: {
            Authorization: 'Bearer '.concat(authorizationToken),
          },
        });
        const result: UseDeliveriesProductResponse = await response.data;

        if (!result[0]) {
          throw new Error('Not found Deliveries products');
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
