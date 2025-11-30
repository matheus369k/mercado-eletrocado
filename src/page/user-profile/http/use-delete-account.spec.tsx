import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDeleteAccount } from './use-delete-account';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('delete account http', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const deleteAccountRoute = '/api/users/delete';
  const tokenRoute = '/token';

  beforeEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should complete request', async () => {
    axiosFetch.onDelete(deleteAccountRoute).reply(200);
    axiosFetch.onDelete(tokenRoute).reply(200);
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(useDeleteAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync());
    for (let index = 0; index < 2; index++) {
      const requestStories = axiosFetch.history[index];

      const isNotHaveRequesRequest = index === 2;
      if (isNotHaveRequesRequest) {
        expect(requestStories).toBeUndefined();
        continue;
      }

      expect(requestStories.withCredentials).toBeTruthy();

      const isDeleteAndInvalideAuthorizationTokenRequest = index === 1;
      if (isDeleteAndInvalideAuthorizationTokenRequest) {
        expect(requestStories.url).toBe(tokenRoute);
        expect(requestStories.method).toBe('delete');
        continue;
      }

      expect(requestStories.url).toBe(deleteAccountRoute);
    }

    expect(spyInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['get-user', 'user-account', 'user-authorization'],
    });
  });

  it('should call token api when receive error 401(not authorization)', async () => {
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    axiosFetch.onDelete(deleteAccountRoute).replyOnce(401);
    axiosFetch.onDelete(deleteAccountRoute).reply(200);
    axiosFetch.onDelete(tokenRoute).reply(200);
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useDeleteAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync());

    for (let index = 0; index < 5; index++) {
      const requestStories = axiosFetch.history[index];

      const isNotHaveRequesRequest = index === 4;
      if (isNotHaveRequesRequest) {
        expect(requestStories).toBeUndefined();
        continue;
      }

      expect(requestStories.withCredentials).toBeTruthy();

      const isDeleteAndInvalideAuthorizationTokenRequest = index === 3;
      if (isDeleteAndInvalideAuthorizationTokenRequest) {
        expect(requestStories.url).toBe(tokenRoute);
        expect(requestStories.method).toBe('delete');
        continue;
      }

      const isRefreshAuthorizationTokenRequest = index === 1;
      if (isRefreshAuthorizationTokenRequest) {
        expect(requestStories.url).include(tokenRoute);
        expect(requestStories.method).toBe('get');
        continue;
      }

      expect(requestStories.url).include(deleteAccountRoute);
    }

    expect(spyInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['get-user', 'user-account', 'user-authorization'],
    });
  });

  it('no should recall delete account api when token api not return status 200', async () => {
    axiosFetch.onDelete(deleteAccountRoute).reply(401);
    axiosFetch.onGet(tokenRoute).reply(201);
    const { result } = renderHook(useDeleteAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync());

    for (let index = 0; index <= 2; index++) {
      const requestStories = axiosFetch.history[index];

      const isRecallDeleteAccountRequest = index === 2;
      if (isRecallDeleteAccountRequest) {
        expect(requestStories).toBeUndefined();
        continue;
      }

      expect(requestStories.withCredentials).toBeTruthy();

      const isRefreshAuthorizationToken = index === 1;
      if (isRefreshAuthorizationToken) {
        expect(requestStories.url).include(tokenRoute);
        continue;
      }

      expect(requestStories.url).include(deleteAccountRoute);
    }
  });
});
