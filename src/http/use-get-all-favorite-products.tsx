import { axiosBackEndAPI } from '@/lib/axios';
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
    queryFn: async () => {
      const response = await axiosBackEndAPI
        .get(`/api/products/favorite`, {
          withCredentials: true,
        })
        .catch(async (error) => {
          if (error.status === 401) {
            const result = await axiosBackEndAPI.get('/token', {
              withCredentials: true,
            });

            if (result.status === 200) {
              return await axiosBackEndAPI.get(`/api/products/favorite`, {
                withCredentials: true,
              });
            }
          }
        });

      const result: UseFavoriteProductResponse = await response.data;
      if (!result[0]) {
        throw new Error('Not found favorites products');
      }

      return result;
    },
  });
};
