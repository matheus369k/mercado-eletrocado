import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useCreateDeliveriesProducts } from './use-create-delivery';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('create delivery product', () => {
  const tokenRoute = '/token';
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const createDeliveryProductRoute = `/api/products/delivery`;
  const deliveryProduct = Array.from({ length: 5 }).map(() => ({
    productId: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 156899, max: 347299 }),
  }));

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should checked configuration from create delivery', async () => {
    axiosFetch.onPost(createDeliveryProductRoute).reply(200);
    const { result } = renderHook(useCreateDeliveriesProducts, { wrapper });

    await waitFor(() => result.current.mutateAsync(deliveryProduct));
    const createDeliveryProductRequest = axiosFetch.history[0];

    expect(createDeliveryProductRequest).includes({
      url: createDeliveryProductRoute,
      method: 'post',
      data: JSON.stringify(deliveryProduct),
      withCredentials: true,
    });
    expect(createDeliveryProductRequest.headers).includes({
      'Content-Type': 'application/json',
    });
  });

  it('should create favorite and invalidation get delivery query', async () => {
    axiosFetch.onPost(createDeliveryProductRoute).replyOnce(401);
    axiosFetch.onPost(createDeliveryProductRoute).reply(200);
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(useCreateDeliveriesProducts, { wrapper });

    await waitFor(() => result.current.mutateAsync(deliveryProduct));

    const createDeliveryProductRequest = axiosFetch.history[0];
    expect(createDeliveryProductRequest).includes({
      url: createDeliveryProductRoute,
      method: 'post',
    });

    expect(spyInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ['deliveries-products', 'all-deliveries-products'],
    });
  });

  it('should recall request when receive error 401 and request to generate new token is complete', async () => {
    axiosFetch.onPost(createDeliveryProductRoute).replyOnce(401);
    axiosFetch.onPost(createDeliveryProductRoute).reply(200);
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useCreateDeliveriesProducts, { wrapper });

    await waitFor(() => result.current.mutateAsync(deliveryProduct));

    const createDeliveryProductRequest = axiosFetch.history[0];
    expect(createDeliveryProductRequest).includes({
      url: createDeliveryProductRoute,
      method: 'post',
    });
    const generateNewAccessTokenRequest = axiosFetch.history[1];
    expect(generateNewAccessTokenRequest).includes({ url: tokenRoute, method: 'get' });
    const recallCreateDeliveryProductRequest = axiosFetch.history[2];
    expect(recallCreateDeliveryProductRequest).includes({
      url: createDeliveryProductRoute,
      method: 'post',
    });
  });
});
