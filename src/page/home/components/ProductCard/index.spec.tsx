import { render, screen } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import { ProductCard } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import type { ReactNode } from 'react';
import userEvent from '@testing-library/user-event';
import { ROUTES_PATHNAMES } from '@/util/const';
import { QueryClient, QueryClientProvider, type UseQueryResult } from '@tanstack/react-query';
import axiosMockAdapter from 'axios-mock-adapter';
import { axiosBackEndAPI } from '@/lib/axios';

const queryClient = new QueryClient({
  defaultOptions: { queries: { experimental_prefetchInRender: true } },
});
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
}));

vi.mock('@/http/use-profile-account.tsx', () => ({
  useProfileAccount: vi.fn(() => {
    return {
      isError: false,
    } as UseQueryResult<Object, Error>;
  }),
}));

const product = {
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
};

const favoriteProducts = {
  productId: product._id,
  image: product.img,
  name: product.model,
  price: product.price,
  id: faker.database.mongodbObjectId(),
  createAt: faker.date.past().toISOString(),
};

vi.mock('@/http/use-get-all-favorite-products.tsx', () => ({
  useGetAllFavoriteProduct: vi.fn(() => {
    return {
      data: [],
    } as UseQueryResult<[typeof favoriteProducts], Error>;
  }),
}));

describe('product card component', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const createFavoriteProductRoute = `/api/products/favorite`;
  const userEvents = userEvent.setup();

  it('should redirect when is clicked on the product picture', async () => {
    render(<ProductCard {...product} />, {
      wrapper,
    });

    await userEvents.click(screen.getByAltText(product.model));

    expect(mockNavigate).toBeCalledWith(
      ROUTES_PATHNAMES.PRODUCT.replace(':productId', product._id),
    );
  });

  it('should call to create/delete favorite product when is clicked in favorite button', async () => {
    axiosFetch.onPost(createFavoriteProductRoute);
    render(<ProductCard {...product} />, {
      wrapper,
    });

    await userEvents.click(screen.getByLabelText(/adicionar aos favoritos/i));

    const firstFetchStory = axiosFetch.history[0];
    expect(firstFetchStory.url).includes(createFavoriteProductRoute);
    expect(firstFetchStory.withCredentials).toEqual(true);
    expect(firstFetchStory.data).includes(
      JSON.stringify({
        productId: product._id,
        image: product.img,
        name: product.model,
        price: product.price,
      }),
    );
    expect(axiosFetch.history[1]).toBeUndefined();
  });
});
