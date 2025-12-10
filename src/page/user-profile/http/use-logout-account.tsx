import { useGenerateAccessToken } from '@/http/use-generate-access-token';
import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';

export const useLogoutAccount = () => {
  const { mutateAsync: generateAccessToken } = useGenerateAccessToken();

  return useMutation({
    mutationFn: async () => {
      const requestUrl = '/api/users/logout';
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
    onSuccess: async (_, __, ___, { client }) => {
      const response = await axiosBackEndAPI.delete('/token', {
        withCredentials: true,
      });

      if (response.status === 200) {
        client.invalidateQueries({
          queryKey: ['get-user', 'user-account', 'user-authorization'],
        });
      }
    },
  });
};
