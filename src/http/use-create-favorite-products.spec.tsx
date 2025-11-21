import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { render, renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCreateFavoriteProduct } from './use-create-favorite-products';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('create favorite product', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const createFavoriteProductRoute = `/api/products/favorite`;
  const favoriteProduct = {
    productId: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 156899, max: 347299 }),
  };

  beforeEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should complete request', async () => {
    axiosFetch.onPost(createFavoriteProductRoute);
    const { result } = renderHook(useCreateFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync(favoriteProduct));
    const requestStories = axiosFetch.history[0];

    expect(requestStories.data).toBe(JSON.stringify(favoriteProduct));
    expect(requestStories.headers).includes({
      'Content-Type': 'application/json',
    });
    expect(requestStories.withCredentials).toBeTruthy();
  });

  it('should call token api when receive error 401(not authorization)', async () => {
    axiosFetch.onPost(createFavoriteProductRoute).replyOnce(401, { status: 401 });
    axiosFetch.onGet('/token').reply(200, { status: 200 });
    const { result } = renderHook(useCreateFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync(favoriteProduct));

    for (let index = 0; index <= 2; index++) {
      const requestStories = axiosFetch.history[index];
      expect(requestStories.withCredentials).toBeTruthy();

      if (index === 1) {
        expect(requestStories.url).include('/token');
        continue;
      }

      expect(requestStories.headers).toMatchObject({
        'Content-Type': 'application/json',
      });
      expect(requestStories.data).toBe(JSON.stringify(favoriteProduct));
      expect(requestStories.url).include(createFavoriteProductRoute);
    }
  });

  it('no should recall create favorite api when token api not return status 200', async () => {
    axiosFetch.onPost(createFavoriteProductRoute).reply(401, { status: 401 });
    axiosFetch.onGet('/token').reply(201, { status: 201 });
    const { result } = renderHook(useCreateFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync(favoriteProduct));

    for (let index = 0; index <= 2; index++) {
      const requestStories = axiosFetch.history[index];

      const isRecallCreateFavoriteRequest = index === 2;
      if (isRecallCreateFavoriteRequest) {
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
        'Content-Type': 'application/json',
      });
      expect(requestStories.data).toBe(JSON.stringify(favoriteProduct));
      expect(requestStories.url).include(createFavoriteProductRoute);
    }
  });
});
