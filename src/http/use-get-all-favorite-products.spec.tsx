import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useGetAllFavoriteProduct } from './use-get-all-favorite-products';
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

describe('get all favorite product', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const getAllFavoriteProductRoute = '/api/products/favorite';
  const favoriteProducts = Array.from({ length: 3 }).map(() => {
    return {
      productId: faker.database.mongodbObjectId(),
      image: faker.image.url(),
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 156899, max: 347299 }),
      id: faker.database.mongodbObjectId(),
      createAt: faker.date.past().toISOString(),
    };
  });

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should complete request', async () => {
    axiosFetch.onGet(getAllFavoriteProductRoute).reply(200, favoriteProducts);
    const { result } = renderHook(useGetAllFavoriteProduct, { wrapper });

    await waitFor(() => result.current.promise);
    const requestStories = axiosFetch.history[0];

    expect(result.current.data).toMatchObject(favoriteProducts);
    expect(requestStories.url).toBe(getAllFavoriteProductRoute);
    expect(requestStories.withCredentials).toBeTruthy();
  });

  it('should call token api when receive error 401(not authorization)', async () => {
    axiosFetch.onGet(getAllFavoriteProductRoute).replyOnce(401);
    axiosFetch.onGet(getAllFavoriteProductRoute).reply(200, favoriteProducts);
    axiosFetch.onGet('/token').reply(200);
    const { result } = renderHook(useGetAllFavoriteProduct, { wrapper });

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
        expect(result.current.data).toMatchObject(favoriteProducts);
      }

      expect(requestStories.url).include(getAllFavoriteProductRoute);
    }
  });

  it('no should recall get all favorite api when token api not return status 200', async () => {
    axiosFetch.onGet(getAllFavoriteProductRoute).reply(401);
    axiosFetch.onGet('/token').reply(201);
    const { result } = renderHook(useGetAllFavoriteProduct, { wrapper });

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

      expect(requestStories.url).include(getAllFavoriteProductRoute);
    }
  });
});
