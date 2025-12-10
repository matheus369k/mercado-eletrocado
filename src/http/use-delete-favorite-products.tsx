import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { useGenerateAccessToken } from './use-generate-access-token';
import type { AxiosRequestConfig } from 'axios';

type UseDeleteFavoriteProductRequest = {
  productId: string;
};

export const useDeleteFavoriteProduct = () => {
  const { mutateAsync: generateAccessToken } = useGenerateAccessToken();

  return useMutation({
    mutationFn: async ({ productId }: UseDeleteFavoriteProductRequest) => {
      const requestUrl = `/api/products/favorite/${productId}`;
      const requestConfig: AxiosRequestConfig<any> = {
        withCredentials: true,
      };

      return await axiosBackEndAPI.delete(requestUrl, requestConfig).catch(async (response) => {
        const isNotAuthorizationError = response.status !== 401;
        if (isNotAuthorizationError) throw new Error(response.statusText);
        const responseGenerateToken = await generateAccessToken();

        const isNotGenerateNewAccessToken = responseGenerateToken.status !== 200;
        if (isNotGenerateNewAccessToken) throw new Error(response.statusText);
        return await axiosBackEndAPI.delete(requestUrl, requestConfig);
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
