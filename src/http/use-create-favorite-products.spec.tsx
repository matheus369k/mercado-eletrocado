import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useCreateFavoriteProduct } from './use-create-favorite-products';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('create favorite product', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const createFavoriteProductRoute = `/api/products/favorite`;
  const tokenRoute = '/token';
  const favoriteProduct = {
    productId: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 156899, max: 347299 }),
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should checked configuration from create favorite', async () => {
    axiosFetch.onPost(createFavoriteProductRoute).reply(200);
    const { result } = renderHook(useCreateFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync(favoriteProduct));

    const createFavoriteProductRequest = axiosFetch.history[0];
    expect(createFavoriteProductRequest).includes({
      url: createFavoriteProductRoute,
      method: 'post',
      data: JSON.stringify(favoriteProduct),
      withCredentials: true,
    });
    expect(createFavoriteProductRequest.headers).includes({
      'Content-Type': 'application/json',
    });
  });

  it('should create favorite and invalidation get favorite query', async () => {
    axiosFetch.onPost(createFavoriteProductRoute).reply(200);
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(useCreateFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync(favoriteProduct));

    const createFavoriteProductRequest = axiosFetch.history[0];
    expect(createFavoriteProductRequest).includes({
      url: createFavoriteProductRoute,
      method: 'post',
    });
    expect(spyInvalidateQueries).toHaveBeenNthCalledWith(1, {
      queryKey: ['favorite-products', 'all-favorites-products'],
    });
    expect(spyInvalidateQueries).toHaveBeenNthCalledWith(2, {
      queryKey: ['favorite-products', favoriteProduct.productId],
    });
  });

  it('should recall request when receive error 401 and request to generate new token is complete', async () => {
    axiosFetch.onPost(createFavoriteProductRoute).replyOnce(401);
    axiosFetch.onPost(createFavoriteProductRoute).reply(200);
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useCreateFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync(favoriteProduct));

    const createFavoriteProductRequest = axiosFetch.history[0];
    expect(createFavoriteProductRequest).includes({
      url: createFavoriteProductRoute,
      method: 'post',
    });
    const generateNewAccessTokenRequest = axiosFetch.history[1];
    expect(generateNewAccessTokenRequest).includes({ url: tokenRoute, method: 'get' });
    const recallCreateFavoriteProductRequest = axiosFetch.history[2];
    expect(recallCreateFavoriteProductRequest).includes({
      url: createFavoriteProductRoute,
      method: 'post',
    });
  });
});
