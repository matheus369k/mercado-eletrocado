import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { render, renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, it } from 'vitest';
import { useUpdateAccount } from './use-update-profile';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('update account request', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const updateAccountRoute = '/api/users/update';

  beforeEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should complete request', async () => {
    axiosFetch.onPatch(updateAccountRoute);
    const { result } = renderHook(useUpdateAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync(new FormData()));
    const requestStories = axiosFetch.history[0];

    expect(requestStories.headers).includes({
      'Content-Type': 'multipart/form-data',
    });
    expect(requestStories.withCredentials).toBeTruthy();
  });

  it('should call token api when receive error 401(not authorization)', async () => {
    axiosFetch.onPatch(updateAccountRoute).replyOnce(401, { status: 401 });
    axiosFetch.onGet('/token').reply(200, { status: 200 });
    const { result } = renderHook(useUpdateAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync(new FormData()));

    for (let index = 0; index < 3; index++) {
      const requestStories = axiosFetch.history[index];
      expect(requestStories.withCredentials).toBeTruthy();

      const isRefreshAuthorizationToken = index === 1;
      if (isRefreshAuthorizationToken) {
        expect(requestStories.url).include('/token');
        continue;
      }

      expect(requestStories.headers).toMatchObject({
        'Content-Type': 'multipart/form-data',
      });
      expect(requestStories.url).include(updateAccountRoute);
    }
  });

  it('no should recall update account api when token api not return status 200', async () => {
    axiosFetch.onPatch(updateAccountRoute).reply(401, { status: 401 });
    axiosFetch.onGet('/token').reply(201, { status: 201 });
    const { result } = renderHook(useUpdateAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync(new FormData()));

    for (let index = 0; index < 3; index++) {
      const requestStories = axiosFetch.history[index];

      const isRecallUpdateAccountRequest = index === 2;
      if (isRecallUpdateAccountRequest) {
        expect(requestStories).toBeUndefined();
        continue;
      }

      expect(requestStories.withCredentials).toBeTruthy();

      const isRefreshAuthorizationToken = index === 1;
      if (isRefreshAuthorizationToken) {
        expect(requestStories.url).include('/token');
        continue;
      }

      expect(requestStories.headers).toMatchObject({
        'Content-Type': 'multipart/form-data',
      });

      expect(requestStories.url).include(updateAccountRoute);
    }
  });
});
