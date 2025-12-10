import { useGenerateAccessToken } from '@/http/use-generate-access-token';
import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';

export type UseCreateDeliveriesProductsRequest = {
  productId: string;
  price: number;
  image: string;
  name: string;
}[];

export const useCreateDeliveriesProducts = () => {
  const { mutateAsync: generateAccessToken } = useGenerateAccessToken();

  return useMutation({
    mutationFn: async (data: UseCreateDeliveriesProductsRequest) => {
      const requestUrl = '/api/products/delivery';
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
        return await await axiosBackEndAPI.post(requestUrl, data, requestConfig);
      });
    },
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({
        queryKey: ['deliveries-products', 'all-deliveries-products'],
      });
    },
  });
};
