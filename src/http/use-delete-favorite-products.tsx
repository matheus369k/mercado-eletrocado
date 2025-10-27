import { axiosBackEndAPI } from '@/lib/axios';
import { COOKIES_KEYS } from '@/util/const';
import cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

type UseDeleteFavoriteProductRequest = {
  productId: string;
};

export const useDeleteFavoriteProduct = () => {
  return useMutation({
    mutationFn: async ({ productId }: UseDeleteFavoriteProductRequest) => {
      try {
        const authorizationToken = cookies.get(COOKIES_KEYS.AUTHORIZATION_TOKEN);
        if (!authorizationToken) {
          throw new Error('User not have authorization');
        }

        await axiosBackEndAPI.delete(`/products/favorite/${productId}`, {
          headers: {
            Authorization: 'Bearer '.concat(authorizationToken),
          },
        });
      } catch (error) {
        console.error(error);
      }
    },
  });
};
