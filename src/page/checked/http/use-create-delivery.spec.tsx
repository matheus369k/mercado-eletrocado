import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCreateDeliveriesProducts } from './use-create-delivery';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('create delivery product', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const createDeliveryProductRoute = `/api/products/delivery`;
  const deliveryProduct = Array.from({ length: 5 }).map(() => ({
    productId: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 156899, max: 347299 }),
  }));

  beforeEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should complete request', async () => {
    axiosFetch.onPost(createDeliveryProductRoute);
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(useCreateDeliveriesProducts, { wrapper });

    await waitFor(() => result.current.mutateAsync(deliveryProduct));
    const requestStories = axiosFetch.history[0];

    expect(requestStories.data).toBe(JSON.stringify(deliveryProduct));
    expect(requestStories.headers).includes({
      'Content-Type': 'application/json',
    });
    expect(requestStories.withCredentials).toBeTruthy();
    expect(spyInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['deliveries-products', 'all-deliveries-products'],
    });
  });

  it('should call token api when receive error 401(not authorization)', async () => {
    axiosFetch.onPost(createDeliveryProductRoute).replyOnce(401, { status: 401 });
    axiosFetch.onGet('/token').reply(200, { status: 200 });
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(useCreateDeliveriesProducts, { wrapper });

    await waitFor(() => result.current.mutateAsync(deliveryProduct));

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
      expect(requestStories.data).toBe(JSON.stringify(deliveryProduct));
      expect(requestStories.url).include(createDeliveryProductRoute);
    }

    expect(spyInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['deliveries-products', 'all-deliveries-products'],
    });
  });

  it('no should recall create favorite api when token api not return status 200', async () => {
    axiosFetch.onPost(createDeliveryProductRoute).reply(401, { status: 401 });
    axiosFetch.onGet('/token').reply(201, { status: 201 });
    const { result } = renderHook(useCreateDeliveriesProducts, { wrapper });

    await waitFor(() => result.current.mutateAsync(deliveryProduct));

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
      expect(requestStories.data).toBe(JSON.stringify(deliveryProduct));
      expect(requestStories.url).include(createDeliveryProductRoute);
    }
  });
});
