import { axiosBackEndAPI } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import { useGenerateAccessToken } from './use-generate-access-token';

type UserProfileResponse = {
  avatar: string | null;
  email: string;
  name: string;
  cep: string;
  id: string;
};

export const useProfileAccount = () => {
  const { mutateAsync: generateAccessToken } = useGenerateAccessToken();

  return useQuery<UserProfileResponse>({
    queryKey: ['get-user', 'user-account', 'user-authorization'],
    experimental_prefetchInRender: true,
    queryFn: async () => {
      const requestUrl = '/api/users/profile';
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
