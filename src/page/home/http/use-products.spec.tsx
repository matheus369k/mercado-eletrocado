import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useProducts, type AllProductsType, type ProductType } from './use-products';
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

describe('products request', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const allProductsRoute = '/api/products';
  const categoryProductsRoute = allProductsRoute.concat('/notebook');
  const cartProductsCache = Array.from({ length: 2 }).map(() => ({
    _id: faker.database.mongodbObjectId(),
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
  }));

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should checked configuration from get all product', async () => {
    axiosFetch.onGet(allProductsRoute).reply(200, cartProductsCache);
    const { result } = renderHook(useProducts, { wrapper, initialProps: 'all' });

    await waitFor(() => result.current.promise as Promise<AllProductsType>);

    const useGetAllProductRequest = axiosFetch.history[0];
    expect(useGetAllProductRequest).includes({ url: allProductsRoute, method: 'get' });
  });

  it('should returned all products', async () => {
    axiosFetch.onGet(allProductsRoute).reply(200, cartProductsCache);
    const { result } = renderHook(useProducts, { wrapper, initialProps: 'all' });

    await waitFor(() => expect(result.current.data).toMatchObject(cartProductsCache));

    const useGetAllProductRequest = axiosFetch.history[0];
    expect(useGetAllProductRequest.url).toBe(allProductsRoute);
  });

  it('should checked configuration from get for category product', async () => {
    axiosFetch.onGet(categoryProductsRoute).reply(200, cartProductsCache);
    const { result } = renderHook(useProducts, { wrapper, initialProps: 'notebook' });

    await waitFor(() => result.current.promise as Promise<AllProductsType>);

    const useGetAllProductRequest = axiosFetch.history[0];
    expect(useGetAllProductRequest).includes({ url: categoryProductsRoute, method: 'get' });
  });

  it('should returned for categories products', async () => {
    axiosFetch.onGet(categoryProductsRoute).reply(200, cartProductsCache);
    const { result } = renderHook(useProducts, { wrapper, initialProps: 'notebook' });

    await waitFor(() => expect(result.current.data).toMatchObject(cartProductsCache));

    const useGetForCategoryProductRequest = axiosFetch.history[0];
    expect(useGetForCategoryProductRequest.url).toBe(categoryProductsRoute);
  });
});
