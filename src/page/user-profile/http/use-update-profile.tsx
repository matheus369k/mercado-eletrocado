import { useGenerateAccessToken } from '@/http/use-generate-access-token';
import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';

export const useUpdateAccount = () => {
  const { mutateAsync: generateAccessToken } = useGenerateAccessToken();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const requestUrl = '/api/users/update';
      const requestConfig: AxiosRequestConfig<any> = {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      };

      return await axiosBackEndAPI
        .patch(requestUrl, formData, requestConfig)
        .catch(async (response) => {
          const isNotAuthorizationError = response.status !== 401;
          if (isNotAuthorizationError) throw new Error(response.statusText);
          const responseGenerateToken = await generateAccessToken();

          const isNotGenerateNewAccessToken = responseGenerateToken.status !== 200;
          if (isNotGenerateNewAccessToken) throw new Error(response.statusText);
          return await axiosBackEndAPI.patch(requestUrl, formData, requestConfig);
        });
    },
    onSuccess: (_, __, ___, { client }) => {
      client.invalidateQueries({
        queryKey: ['get-user', 'user-account', 'user-authorization'],
      });
    },
  });
};
