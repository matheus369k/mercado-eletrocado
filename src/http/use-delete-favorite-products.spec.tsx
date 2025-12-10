import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useDeleteFavoriteProduct } from './use-delete-favorite-products';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('delete favorite product', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const productId = faker.database.mongodbObjectId();
  const deleteFavoriteProductRoute = `/api/products/favorite/${productId}`;
  const tokenRoute = '/token';

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should checked configuration from delete favorite', async () => {
    axiosFetch.onDelete(deleteFavoriteProductRoute).reply(200);
    const { result } = renderHook(useDeleteFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync({ productId }));

    const deleteFavoriteProductRequest = axiosFetch.history[0];
    expect(deleteFavoriteProductRequest).includes({
      url: deleteFavoriteProductRoute,
      method: 'delete',
      withCredentials: true,
    });
  });

  it('should delete favorite and invalidation get favorite query', async () => {
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    axiosFetch.onDelete(deleteFavoriteProductRoute).replyOnce(200);
    const { result } = renderHook(useDeleteFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync({ productId }));

    const createFavoriteProductRequest = axiosFetch.history[0];
    expect(createFavoriteProductRequest).includes({
      url: deleteFavoriteProductRoute,
      method: 'delete',
    });
    expect(spyInvalidateQueries).toHaveBeenNthCalledWith(1, {
      queryKey: ['favorite-products', 'all-favorites-products'],
    });
    expect(spyInvalidateQueries).toHaveBeenNthCalledWith(2, {
      queryKey: ['favorite-products', productId],
    });
  });

  it('should recall request when receive error 401 and request to generate new token is complete', async () => {
    axiosFetch.onDelete(deleteFavoriteProductRoute).replyOnce(401);
    axiosFetch.onDelete(deleteFavoriteProductRoute).reply(200);
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useDeleteFavoriteProduct, { wrapper });

    await waitFor(() => result.current.mutateAsync({ productId }));

    const deleteFavoriteProductRequest = axiosFetch.history[0];
    expect(deleteFavoriteProductRequest).includes({
      url: deleteFavoriteProductRoute,
      method: 'delete',
    });
    const generateNewAccessTokenRequest = axiosFetch.history[1];
    expect(generateNewAccessTokenRequest).includes({ url: tokenRoute, method: 'get' });
    const recallDeleteAccountRequest = axiosFetch.history[2];
    expect(recallDeleteAccountRequest).includes({
      url: deleteFavoriteProductRoute,
      method: 'delete',
    });
  });
});
