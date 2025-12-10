import { axiosBackEndAPI } from '@/lib/axios';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useUpdateAccount } from './use-update-profile';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
  },
});
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('update account http', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const updateAccountRoute = '/api/users/update';
  const tokenRoute = '/token';

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should checked configuration from update account', async () => {
    axiosFetch.onPatch(updateAccountRoute).reply(200);
    const { result } = renderHook(useUpdateAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync(new FormData()));

    const updateAccountRequest = axiosFetch.history[0];
    expect(updateAccountRequest).includes({
      withCredentials: true,
      url: updateAccountRoute,
      method: 'patch',
    });
    expect(updateAccountRequest.headers).includes({
      'Content-Type': 'multipart/form-data',
    });
    expect(updateAccountRequest.data).instanceOf(FormData);
  });

  it('should update account and invalidation user profile query', async () => {
    axiosFetch.onPatch(updateAccountRoute).reply(200);
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(useUpdateAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync(new FormData()));

    const updateAccountRequest = axiosFetch.history[0];
    expect(updateAccountRequest).includes({ url: updateAccountRoute });
    expect(spyInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['get-user', 'user-account', 'user-authorization'],
    });
  });

  it('should recall request when receive error 401 and request to generate new token is complete', async () => {
    axiosFetch.onPatch(updateAccountRoute).replyOnce(401);
    axiosFetch.onPatch(updateAccountRoute).reply(200);
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useUpdateAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync(new FormData()));

    const updateAccountRequest = axiosFetch.history[0];
    expect(updateAccountRequest).includes({ url: updateAccountRoute, method: 'patch' });
    const generateNewAccessTokenRequest = axiosFetch.history[1];
    expect(generateNewAccessTokenRequest).includes({ url: tokenRoute, method: 'get' });
    const recallUpdateAccountRequest = axiosFetch.history[2];
    expect(recallUpdateAccountRequest).includes({ url: updateAccountRoute, method: 'patch' });
  });
});
