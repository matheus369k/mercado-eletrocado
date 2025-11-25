import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider, type UseQueryResult } from '@tanstack/react-query';
import axiosMockAdapter from 'axios-mock-adapter';
import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { render, screen } from '@testing-library/react';
import { Home } from '.';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useProductsCategories } from './hook/use-products';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="*" element={children} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

vi.mock('@/http/use-profile-account.tsx', () => ({
  useProfileAccount: vi.fn(() => {
    return {
      isError: false,
    } as UseQueryResult<Object, Error>;
  }),
}));

vi.mock('@/http/use-get-all-favorite-products.tsx', () => ({
  useGetAllFavoriteProduct: vi.fn(() => {
    return {
      data: [],
    } as UseQueryResult<[], Error>;
  }),
}));

describe('home page', () => {
  const userEvents = userEvent.setup();
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const allCategoriesProductsRoute = '/api/products';
  const productsCategories = ['phone', 'notebook', 'tablet'];
  const onlyCategoryProducts = Array.from({ length: 3 }).map((_, index) => ({
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
    category: productsCategories[index],
  }));
  const allCategoriesProducts = onlyCategoryProducts.reduce((acc, curr) => {
    if (acc[curr.category]) {
      {
        acc[curr.category].push(curr);
      }
    } else {
      return {
        [curr.category]: [curr],
        ...(acc || []),
      };
    }
    return acc;
  }, {});

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should render all products cards without filter', async () => {
    axiosFetch.onGet(allCategoriesProductsRoute).reply(200, allCategoriesProducts);
    render(<Home />, { wrapper });

    screen.getAllByLabelText(/loading all category container/i);
    await screen.findAllByLabelText(/all category container/i);
    await screen.findByRole('heading', { level: 2, name: /produtos/i });
    await screen.findByRole('heading', { level: 3, name: /notebook/i });
    screen.getByRole('heading', { level: 3, name: /tablet/i });
    screen.getByRole('heading', { level: 3, name: /celular/i });
  });

  it('should render only products cards with filter using queryParam from url', async () => {
    const onlyCategoryProductsRoute = allCategoriesProductsRoute.concat('/notebook');
    axiosFetch.onGet(onlyCategoryProductsRoute).reply(200, onlyCategoryProducts);
    const newUrl = new URL(window.location.toString());
    newUrl.searchParams.set('filter', 'notebook');
    window.history.pushState({}, '', newUrl);
    render(<Home />, { wrapper });

    screen.getByLabelText(/loading only category container/i);
    await screen.findByLabelText(/only category container/i);
    await screen.findByRole('heading', { level: 2, name: /notebook/i });
    expect(screen.queryByRole('heading', { level: 3, name: /tablet/i })).toBeNull();
    expect(screen.queryByRole('heading', { level: 3, name: /celular/i })).toBeNull();
  });

  it('should render only products cards with filter when is clicked in filter button', async () => {
    axiosFetch.onGet(allCategoriesProductsRoute.concat('/tablet')).reply(200, onlyCategoryProducts);
    axiosFetch
      .onGet(allCategoriesProductsRoute.concat('/notebook'))
      .reply(200, onlyCategoryProducts);
    render(<Home />, { wrapper });

    await userEvents.click(screen.getByRole('button', { name: /tablet/i }));

    await screen.findByLabelText(/only category container/i);
    await screen.findByRole('heading', { level: 2, name: /tablet/i });
    expect(screen.queryByRole('heading', { level: 3, name: /notebook/i })).toBeNull();
    expect(screen.queryByRole('heading', { level: 3, name: /celular/i })).toBeNull();
  });
});
