import { axiosBackEndAPI } from '@/lib/axios';
import { COOKIES_KEYS } from '@/util/const';
import cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';

type UseFavoriteProductResponse = {
  id: string;
  createAt: string;
  productId: string;
  price: number;
  image: string;
  name: string;
}[];

export const useGetAllFavoriteProduct = () => {
  return useQuery({
    queryKey: ['favorite-products', 'all-favorites-products'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      try {
        const authorizationToken = cookies.get(COOKIES_KEYS.AUTHORIZATION_TOKEN);
        if (!authorizationToken) {
          throw new Error('User not have authorization');
        }

        const response = await axiosBackEndAPI.get(`/products/favorite`, {
          headers: {
            Authorization: 'Bearer '.concat(authorizationToken),
          },
        });
        const result: UseFavoriteProductResponse = await response.data;

        if (!result[0]) {
          throw new Error('Not found favorites products');
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
