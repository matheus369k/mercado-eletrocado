import { axiosBackEndAPI } from '@/lib/axios';
import { COOKIES_KEYS } from '@/util/const';
import cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

export type UseCreateDeliveriesProductsRequest = {
  price: number;
  image: string;
  name: string;
}[];

export const useCreateDeliveriesProducts = () => {
  return useMutation({
    mutationFn: async (data: UseCreateDeliveriesProductsRequest) => {
      try {
        const authorizationToken = cookies.get(COOKIES_KEYS.AUTHORIZATION_TOKEN);
        if (!authorizationToken) {
          throw new Error('User not have authorization');
        }

        const deliveriesProducts = data.map((product) => {
          return {
            ...product,
            price: Number((product.price % 1).toFixed(2)) * 100 + Math.floor(product.price) * 100,
          };
        });

        await axiosBackEndAPI.post('/products/delivery', deliveriesProducts, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '.concat(authorizationToken),
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });
};
