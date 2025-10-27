import { axiosBackEndAPI } from '@/lib/axios';
import { COOKIES_KEYS } from '@/util/const';
import cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

type UseCreateFavoriteProductRequest = {
  productId: string;
  price: number;
  image: string;
  name: string;
};

export const useCreateFavoriteProduct = () => {
  return useMutation({
    mutationFn: async (data: UseCreateFavoriteProductRequest) => {
      try {
        const authorizationToken = cookies.get(COOKIES_KEYS.AUTHORIZATION_TOKEN);
        if (!authorizationToken) {
          throw new Error('User not have authorization');
        }

        const { image, name, price, productId } = data;
        const formattedPrice = Number((price % 1).toFixed(2)) * 100 + Math.floor(price) * 100;
        await axiosBackEndAPI.post(
          '/products/favorite',
          { productId, image, name, price: formattedPrice },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer '.concat(authorizationToken),
            },
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
  });
};
