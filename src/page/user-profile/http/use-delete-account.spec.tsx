import { axiosBackEndAPI } from '@/lib/axios';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useDeleteAccount } from './use-delete-account';
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

describe('delete account http', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const deleteAccountRoute = '/api/users/delete';
  const tokenRoute = '/token';

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should checked configuration from delete account', async () => {
    axiosFetch.onDelete(deleteAccountRoute).reply(200);
    axiosFetch.onDelete(tokenRoute).reply(200);
    const { result } = renderHook(useDeleteAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync());

    const deleteAccountRequest = axiosFetch.history[0];
    expect(deleteAccountRequest).includes({
      url: deleteAccountRoute,
      method: 'delete',
      withCredentials: true,
    });
  });

  it('should checked configuration from delete auth tokens', async () => {
    axiosFetch.onDelete(deleteAccountRoute).reply(200);
    axiosFetch.onDelete(tokenRoute).reply(200);
    const { result } = renderHook(useDeleteAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync());

    const deleteAccountRequest = axiosFetch.history[1];
    expect(deleteAccountRequest).includes({
      url: tokenRoute,
      method: 'delete',
      withCredentials: true,
    });
  });

  it('should delete account, delete auth tokens and invalidation user profile query', async () => {
    axiosFetch.onDelete(deleteAccountRoute).reply(200);
    axiosFetch.onDelete(tokenRoute).reply(200);
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(useDeleteAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync());

    const deleteAccountRequest = axiosFetch.history[0];
    expect(deleteAccountRequest).includes({ url: deleteAccountRoute, method: 'delete' });
    const deleteAuthTokensRequest = axiosFetch.history[1];
    expect(deleteAuthTokensRequest).includes({ url: tokenRoute, method: 'delete' });
    expect(spyInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['get-user', 'user-account', 'user-authorization'],
    });
  });

  it('should recall request when receive error 401 and request to generate new token is complete', async () => {
    axiosFetch.onDelete(deleteAccountRoute).replyOnce(401);
    axiosFetch.onDelete(deleteAccountRoute).reply(200);
    axiosFetch.onDelete(tokenRoute).reply(200);
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useDeleteAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync());

    const deleteAccountRequest = axiosFetch.history[0];
    expect(deleteAccountRequest).includes({ url: deleteAccountRoute, method: 'delete' });
    const generateNewAccessTokenRequest = axiosFetch.history[1];
    expect(generateNewAccessTokenRequest).includes({ url: tokenRoute, method: 'get' });
    const recallDeleteAccountRequest = axiosFetch.history[2];
    expect(recallDeleteAccountRequest).includes({ url: deleteAccountRoute, method: 'delete' });
    const deleteAuthTokensRequest = axiosFetch.history[3];
    expect(deleteAuthTokensRequest).includes({ url: tokenRoute, method: 'delete' });
  });
});
