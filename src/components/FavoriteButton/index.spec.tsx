import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { QueryClient, QueryClientProvider, type UseQueryResult } from '@tanstack/react-query';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FavoriteButton } from '.';
import { ROUTES_PATHNAMES } from '@/util/const';
import { toast } from 'react-toastify';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient({
  defaultOptions: { queries: { experimental_prefetchInRender: true } },
});
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

vi.mock('react-toastify');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
}));

const userProfileAccount = {
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  cep: faker.location.zipCode(),
  id: faker.database.mongodbObjectId(),
};

const mockProfileAccount = vi.fn();
vi.mock('@/http/use-profile-account.tsx', () => ({
  useProfileAccount: () => mockProfileAccount(),
}));

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
vi.mock('@/http/use-get-all-favorite-products.tsx', () => ({
  useGetAllFavoriteProduct: vi.fn(() => {
    return {
      data: favoriteProducts,
    } as UseQueryResult<typeof favoriteProducts, Error>;
  }),
}));

describe('custom hook favorite product', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const productId = favoriteProducts[0].productId;
  const createFavoriteProductRoute = `/api/products/favorite`;
  const deleteFavoriteProductRoute = `/api/products/favorite/${productId}`;
  const userEvents = userEvent.setup();
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

  beforeEach(() => {
    mockProfileAccount.mockReturnValue({ isError: false } as UseQueryResult<
      typeof userProfileAccount,
      Error
    >);
    axiosFetch.onGet('/token').reply(200);
  });

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should render default mode when not found product', async () => {
    render(<FavoriteButton {...product} />, { wrapper });

    await screen.findByTitle(/adicionar aos favoritos/i);
  });

  it('should return IsFavoriteProduct so true when found product', async () => {
    const data = { ...product, _id: favoriteProducts[0].productId };
    render(<FavoriteButton {...data} />, { wrapper });

    await screen.findByTitle(/remover dos favoritos/i);
  });

  it('should redirected user to login page when not have authorization', async () => {
    mockProfileAccount.mockReturnValue({
      isError: true,
    } as UseQueryResult<typeof userProfileAccount, Error>);
    render(<FavoriteButton {...product} />, { wrapper });

    await userEvents.click(await screen.findByTitle(/adicionar aos favoritos/i));

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES_PATHNAMES.USER_LOGIN);
  });

  it('should access delete favorite product when product is already saved', async () => {
    axiosFetch.onDelete(deleteFavoriteProductRoute).reply(200);
    const data = { ...product, _id: favoriteProducts[0].productId };
    render(<FavoriteButton {...data} />, { wrapper });

    const toggleFavoriteButton = await screen.findByTitle(/remover dos favoritos/i);
    await userEvents.click(toggleFavoriteButton);

    expect(axiosFetch.history[0].url).includes(deleteFavoriteProductRoute);
  });

  it('should access add favorite product when product is not already saved', async () => {
    axiosFetch.onPost(createFavoriteProductRoute).reply(200);
    render(<FavoriteButton {...product} />, { wrapper });

    const toggleFavoriteButton = await screen.findByTitle(/adicionar aos favoritos/i);
    await userEvents.click(toggleFavoriteButton);

    expect(axiosFetch.history[0].url).includes(createFavoriteProductRoute);
  });

  it('should invocation toast error function when is api request fails', async () => {
    axiosFetch.onPost(createFavoriteProductRoute).reply(401);
    render(<FavoriteButton {...product} />, { wrapper });

    const toggleFavoriteButton = await screen.findByTitle(/adicionar aos favoritos/i);
    await userEvents.click(toggleFavoriteButton);

    expect(toast.error).toHaveBeenCalled();
  });
});
