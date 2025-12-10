import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useGenerateAccessToken } from './use-generate-access-token';
import type { AxiosRequestConfig } from 'axios';

type UseCreateFavoriteProductRequest = {
  productId: string;
  price: number;
  image: string;
  name: string;
};

export const useCreateFavoriteProduct = () => {
  const { mutateAsync: generateAccessToken } = useGenerateAccessToken();

  return useMutation({
    mutationFn: async (data: UseCreateFavoriteProductRequest) => {
      const requestUrl = '/api/products/favorite';
      const requestConfig: AxiosRequestConfig<any> = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return await axiosBackEndAPI.post(requestUrl, data, requestConfig).catch(async (response) => {
        const isNotAuthorizationError = response.status !== 401;
        if (isNotAuthorizationError) throw new Error(response.statusText);
        const responseGenerateToken = await generateAccessToken();

        const isNotGenerateNewAccessToken = responseGenerateToken.status !== 200;
        if (isNotGenerateNewAccessToken) throw new Error(response.statusText);
        return await axiosBackEndAPI.post(requestUrl, data, requestConfig);
      });
    },
    onSuccess: async (_, { productId }, __, { client }) => {
      await client.invalidateQueries({
        queryKey: ['favorite-products', 'all-favorites-products'],
      });

      await client.invalidateQueries({
        queryKey: ['favorite-products', productId],
      });
    },
  });
};
