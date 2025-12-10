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
  const tokenRoute = '/token';
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

  it('should checked configuration from get all favorite', async () => {
    axiosFetch.onGet(getAllFavoriteProductRoute).reply(200, favoriteProducts);
    const { result } = renderHook(useGetAllFavoriteProduct, { wrapper });

    await waitFor(() => result.current.promise);

    const getAllFavoriteProductRequest = axiosFetch.history[0];
    expect(getAllFavoriteProductRequest).includes({
      url: getAllFavoriteProductRoute,
      method: 'get',
      withCredentials: true,
    });
  });

  it('should returned favorite products', async () => {
    axiosFetch.onGet(getAllFavoriteProductRoute).reply(200, favoriteProducts);
    const { result } = renderHook(useGetAllFavoriteProduct, { wrapper });

    await waitFor(() => result.current.promise);

    expect(result.current.data).toMatchObject(favoriteProducts);
  });

  it('should recall request when receive error 401 and request to generate new token is complete', async () => {
    axiosFetch.onGet(getAllFavoriteProductRoute).replyOnce(401);
    axiosFetch.onGet(getAllFavoriteProductRoute).reply(200, favoriteProducts);
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useGetAllFavoriteProduct, { wrapper });

    await waitFor(() => {
      expect(result.current.data).toMatchObject(favoriteProducts);
    });

    const getAllFavoriteProductRequest = axiosFetch.history[0];
    expect(getAllFavoriteProductRequest).includes({
      url: getAllFavoriteProductRoute,
      method: 'get',
    });
    const generateNewAccessTokenRequest = axiosFetch.history[1];
    expect(generateNewAccessTokenRequest).includes({ url: tokenRoute, method: 'get' });
    const recallGetAllFavoriteProductRequest = axiosFetch.history[2];
    expect(recallGetAllFavoriteProductRequest).includes({
      url: getAllFavoriteProductRoute,
      method: 'get',
    });
  });
});
