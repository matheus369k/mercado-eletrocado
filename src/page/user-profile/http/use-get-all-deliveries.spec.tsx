import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { act, renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useGetAllDeliveriesProduct } from './use-get-all-deliveries';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, experimental_prefetchInRender: true },
  },
});
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('get all delivery product', () => {
  const tokenRoute = '/token';
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const getAllDeliveriesProductRoute = '/api/products/delivery';
  const deliveryProducts = Array.from({ length: 3 }).map(() => {
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

  it('should checked configuration from get all deliveries product', async () => {
    axiosFetch.onGet(getAllDeliveriesProductRoute).reply(200, deliveryProducts);
    const { result } = renderHook(useGetAllDeliveriesProduct, { wrapper });

    await waitFor(() => result.current.promise);

    const getAllDeliveriesProduct = axiosFetch.history[0];
    expect(getAllDeliveriesProduct).includes({
      url: getAllDeliveriesProductRoute,
      method: 'get',
      withCredentials: true,
    });
  });

  it('should returned all deliveries product', async () => {
    axiosFetch.onGet(getAllDeliveriesProductRoute).reply(200, deliveryProducts);
    const { result } = renderHook(useGetAllDeliveriesProduct, { wrapper });

    await waitFor(() => result.current.promise);

    expect(result.current.data).toMatchObject(deliveryProducts);
  });

  it('should recall request when receive error 401 and request to generate new token is complete', async () => {
    axiosFetch.onGet(getAllDeliveriesProductRoute).replyOnce(401);
    axiosFetch.onGet(getAllDeliveriesProductRoute).replyOnce(200, deliveryProducts);
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useGetAllDeliveriesProduct, { wrapper });

    await waitFor(() => {
      expect(result.current.data).toMatchObject(deliveryProducts);
    });

    const getAllDeliveryProductRequest = axiosFetch.history[0];
    expect(getAllDeliveryProductRequest).includes({
      url: getAllDeliveriesProductRoute,
      method: 'get',
    });
    const generateNewAccessTokenRequest = axiosFetch.history[1];
    expect(generateNewAccessTokenRequest).includes({ url: tokenRoute, method: 'get' });
    const recallDeliveryRequest = axiosFetch.history[2];
    expect(recallDeliveryRequest).includes({
      url: getAllDeliveriesProductRoute,
      method: 'get',
    });
  });
});
