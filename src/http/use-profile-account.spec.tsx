import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useProfileAccount } from './use-profile-account';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('user profile account', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userProfileAccountRoute = '/api/users/profile';
  const userProfileAccount = {
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    id: faker.database.mongodbObjectId(),
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should complete request', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    const { result } = renderHook(useProfileAccount, { wrapper });

    await waitFor(() => result.current.promise);
    const requestStories = axiosFetch.history[0];

    expect(result.current.data).toMatchObject(userProfileAccount);
    expect(requestStories.url).toBe(userProfileAccountRoute);
    expect(requestStories.withCredentials).toBeTruthy();
  });

  it('should call token api when receive error 401(not authorization)', async () => {
    axiosFetch.onGet(userProfileAccountRoute).replyOnce(401);
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    axiosFetch.onGet('/token').reply(200);
    const { result } = renderHook(useProfileAccount, { wrapper });

    await waitFor(() => result.current.promise);

    for (let index = 0; index <= 2; index++) {
      const requestStories = axiosFetch.history[index];
      expect(requestStories.withCredentials).toBeTruthy();

      const isRefreshAuthorizationToken = index === 1;
      if (isRefreshAuthorizationToken) {
        expect(requestStories.url).include('/token');
        continue;
      }

      const isRecallGetAllFavoriteRequest = index === 2;
      if (isRecallGetAllFavoriteRequest) {
        expect(result.current.data).toMatchObject(userProfileAccount);
      }

      expect(requestStories.url).include(userProfileAccountRoute);
    }
  });

  it('no should recall get profile account api when token api not return status 200', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    axiosFetch.onGet('/token').reply(201);
    const { result } = renderHook(useProfileAccount, { wrapper });

    await waitFor(() => expect(result.current.promise).rejects);

    for (let index = 0; index <= 2; index++) {
      const requestStories = axiosFetch.history[index];

      const isRecallGetAllFavoriteRequest = index === 2;
      if (isRecallGetAllFavoriteRequest) {
        expect(requestStories).toBeUndefined();
        continue;
      }

      expect(requestStories.withCredentials).toBeTruthy();

      const isRefreshAuthorizationToken = index === 1;
      if (isRefreshAuthorizationToken) {
        expect(requestStories.url).include('/token');
        continue;
      }

      expect(requestStories.url).include(userProfileAccountRoute);
    }
  });
});
