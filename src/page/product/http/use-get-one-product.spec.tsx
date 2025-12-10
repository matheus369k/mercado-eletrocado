import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useGetOneProduct } from './use-get-one-product';
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

describe('product request', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const productId = faker.database.mongodbObjectId();
  const productRoute = `/api/products?productId=${productId}`;
  const product = {
    _id: productId,
    price: faker.number.int({ min: 156899, max: 347499 }),
    model: faker.commerce.productName(),
    img: faker.image.url(),
    slide: {
      slide1: faker.image.url(),
      slide2: faker.image.url(),
      slide3: faker.image.url(),
    },
    screen: faker.commerce.productMaterial(),
    processor: faker.commerce.productMaterial(),
    memory: faker.commerce.productMaterial(),
    placeVideo: faker.commerce.productMaterial(),
    battery: faker.commerce.productMaterial(),
    category: faker.commerce.department(),
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should checked configuration from get one product', async () => {
    axiosFetch.onGet(productRoute).reply(200, product);
    const { result } = renderHook(useGetOneProduct, { wrapper, initialProps: { productId } });

    await waitFor(() => result.current.promise);

    const productRequest = axiosFetch.history[0];
    expect(productRequest).includes({ url: productRoute, method: 'get' });
  });

  it('should returned one product', async () => {
    axiosFetch.onGet(productRoute).reply(200, product);
    const { result } = renderHook(useGetOneProduct, { wrapper, initialProps: { productId } });

    await waitFor(() => expect(result.current.data).toMatchObject(product));

    const useGetForCategoryProductRequest = axiosFetch.history[0];
    expect(useGetForCategoryProductRequest.url).toBe(productRoute);
  });
});
