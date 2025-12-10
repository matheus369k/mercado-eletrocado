import { useGenerateAccessToken } from '@/http/use-generate-access-token';
import { axiosBackEndAPI } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

type UseDeliveriesProductResponse = {
  deliveryDate: string;
  productId: string;
  price: number;
  image: string;
  name: string;
  id: string;
}[];

export const useGetAllDeliveriesProduct = () => {
  const { mutateAsync: generateAccessToken } = useGenerateAccessToken();

  return useQuery<UseDeliveriesProductResponse>({
    queryKey: ['deliveries-products', 'all-deliveries-products'],
    queryFn: async () => {
      const requestUrl = '/api/products/delivery';
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

      return response.data;
    },
  });
};
