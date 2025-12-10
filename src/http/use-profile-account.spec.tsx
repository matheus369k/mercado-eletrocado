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
  const tokenRoute = '/token';
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

  it('should checked configuration from profile account', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    const { result } = renderHook(useProfileAccount, { wrapper });

    await waitFor(() => result.current.promise);

    const userProfileAccountRequest = axiosFetch.history[0];
    expect(userProfileAccountRequest).includes({
      url: userProfileAccountRoute,
      method: 'get',
      withCredentials: true,
    });
  });

  it('should returned profile account', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    const { result } = renderHook(useProfileAccount, { wrapper });

    await waitFor(() => result.current.promise);

    expect(result.current.data).toMatchObject(userProfileAccount);
  });

  it('should recall request when receive error 401 and request to generate new token is complete', async () => {
    axiosFetch.onGet(userProfileAccountRoute).replyOnce(401);
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useProfileAccount, { wrapper });

    await waitFor(() => {
      expect(result.current.data).toMatchObject(userProfileAccount);
    });

    const profileAccountRequest = axiosFetch.history[0];
    expect(profileAccountRequest).includes({
      url: userProfileAccountRoute,
      method: 'get',
    });
    const generateNewAccessTokenRequest = axiosFetch.history[1];
    expect(generateNewAccessTokenRequest).includes({ url: tokenRoute, method: 'get' });
    const recallProfileAccountRequest = axiosFetch.history[2];
    expect(recallProfileAccountRequest).includes({
      url: userProfileAccountRoute,
      method: 'get',
    });
  });
});
