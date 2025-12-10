import { axiosBackEndAPI } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import { useGenerateAccessToken } from './use-generate-access-token';

type UseFavoriteProductResponse = {
  id: string;
  createAt: string;
  productId: string;
  price: number;
  image: string;
  name: string;
}[];

export const useGetAllFavoriteProduct = () => {
  const { mutateAsync: generateAccessToken } = useGenerateAccessToken();

  return useQuery<UseFavoriteProductResponse>({
    queryKey: ['favorite-products', 'all-favorites-products'],
    queryFn: async () => {
      const requestUrl = '/api/products/favorite';
      const requestConfig: AxiosRequestConfig<any> = {
        withCredentials: true,
      };

      const response = await axiosBackEndAPI
        .get(requestUrl, requestConfig)
        .catch(async (response) => {
          const isNotAuthorizationError = response.status !== 401;
          if (isNotAuthorizationError) throw new Error(response.statusText);
          const responseGenerateToken = await generateAccessToken();

          const isNotGenerateNewAccessToken = responseGenerateToken.status !== 200;
          if (isNotGenerateNewAccessToken) throw new Error(response.statusText);
          return await axiosBackEndAPI.get(requestUrl, requestConfig);
        });

      return await response.data;
    },
  });
};
