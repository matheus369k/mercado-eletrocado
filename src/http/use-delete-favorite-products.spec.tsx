import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, it } from 'vitest';
import { useDeleteFavoriteProduct } from './use-delete-favorite-products';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('delete favorite product', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const productId = faker.database.mongodbObjectId();
  const deleteFavoriteProductRoute = `/api/products/favorite/${productId}`;

  beforeEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should complete request', async () => {
    axiosFetch.onDelete(deleteFavoriteProductRoute);
    const { result } = renderHook(useDeleteFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync({ productId }));
    const requestStories = axiosFetch.history[0];

    expect(requestStories.url).toBe(deleteFavoriteProductRoute);
    expect(requestStories.withCredentials).toBeTruthy();
  });

  it('should call token api when receive error 401(not authorization)', async () => {
    axiosFetch.onDelete(deleteFavoriteProductRoute).replyOnce(401, { status: 401 });
    axiosFetch.onGet('/token').reply(200, { status: 200 });
    const { result } = renderHook(useDeleteFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync({ productId }));

    for (let index = 0; index <= 2; index++) {
      const requestStories = axiosFetch.history[index];
      expect(requestStories.withCredentials).toBeTruthy();

      if (index === 1) {
        expect(requestStories.url).include('/token');
        continue;
      }

      expect(requestStories.url).include(deleteFavoriteProductRoute);
    }
  });

  it('no should recall delete favorite api when token api not return status 200', async () => {
    axiosFetch.onDelete(deleteFavoriteProductRoute).reply(401, { status: 401 });
    axiosFetch.onGet('/token').reply(201, { status: 201 });
    const { result } = renderHook(useDeleteFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync({ productId }));

    for (let index = 0; index <= 2; index++) {
      const requestStories = axiosFetch.history[index];

      const isRecallDeleteFavoriteRequest = index === 2;
      if (isRecallDeleteFavoriteRequest) {
        expect(requestStories).toBeUndefined();
        continue;
      }

      expect(requestStories.withCredentials).toBeTruthy();

      const isRefreshAuthorizationToken = index === 1;
      if (isRefreshAuthorizationToken) {
        expect(requestStories.url).include('/token');
        continue;
      }

      expect(requestStories.url).include(deleteFavoriteProductRoute);
    }
  });
});
