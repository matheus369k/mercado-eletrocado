import { axiosBackEndAPI } from '@/lib/axios';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useLoginAccount } from './use-login-account';
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

describe('user login request', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userLoginRoute = '/api/users/login';
  const userLogin = {
    email: 'test@gmail.com',
    password: 'test1234',
    auto_connection: true,
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should config request corrected', async () => {
    axiosFetch.onPost(userLoginRoute).reply(201);
    const { result } = renderHook(useLoginAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync(userLogin));
    const requestStories = axiosFetch.history[0];

    expect(requestStories.url).toBe(userLoginRoute);
    expect(requestStories.data).toBe(
      JSON.stringify({
        stayConnected: userLogin.auto_connection,
        password: userLogin.password,
        email: userLogin.email,
      }),
    );
    expect(requestStories.withCredentials).toEqual(true);
    expect(requestStories.headers).includes({
      'Content-Type': 'application/json',
    });
  });
});
