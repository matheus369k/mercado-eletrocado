import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { QueryClient, QueryClientProvider, type UseQueryResult } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useFavoriteProduct } from './use-favorite-product';
import { ROUTES_PATHNAMES } from '@/util/const';
import { toast } from 'react-toastify';

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

  it('should return IsFavoriteProduct so false when not found product', () => {
    const { result } = renderHook(() => useFavoriteProduct(product), {
      wrapper,
    });

    expect(result.current.IsFavoriteProduct).toBeFalsy();
  });

  it('should return IsFavoriteProduct so true when found product', () => {
    const { result } = renderHook(
      () => useFavoriteProduct({ ...product, _id: favoriteProducts[0].productId }),
      { wrapper },
    );

    expect(result.current.IsFavoriteProduct).toEqual(true);
  });

  it('should redirected user to login page when not have authorization', async () => {
    mockProfileAccount.mockReturnValue({
      isError: true,
    } as UseQueryResult<typeof userProfileAccount, Error>);
    const { result } = renderHook(() => useFavoriteProduct(product), { wrapper });

    await waitFor(result.current.handleAddRemoveFavoriteProductId);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES_PATHNAMES.USER_LOGIN);
  });

  it('should access delete favorite product when product is already saved', async () => {
    axiosFetch.onDelete(deleteFavoriteProductRoute).reply(200);
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(
      () => useFavoriteProduct({ ...product, _id: favoriteProducts[0].productId }),
      { wrapper },
    );

    expect(result.current.IsFavoriteProduct).toEqual(true);

    await waitFor(result.current.handleAddRemoveFavoriteProductId);

    expect(axiosFetch.history[0].url).includes(deleteFavoriteProductRoute);
    expect(axiosFetch.history[0].withCredentials).toEqual(true);
    expect(axiosFetch.history[1]).toBeUndefined();
    expect(spyInvalidateQueries).toHaveBeenNthCalledWith(1, {
      queryKey: ['favorite-products', 'all-favorites-products'],
    });
    expect(spyInvalidateQueries).toHaveBeenNthCalledWith(2, {
      queryKey: ['favorite-products', favoriteProducts[0].productId],
    });
  });

  it('should access add favorite product when product is not already saved', async () => {
    axiosFetch.onPost(createFavoriteProductRoute).reply(200);
    const spyInvalidateQueries = vi.spyOn(queryClient, 'invalidateQueries');
    const { result } = renderHook(() => useFavoriteProduct(product), { wrapper });

    expect(result.current.IsFavoriteProduct).toBeFalsy();

    await waitFor(result.current.handleAddRemoveFavoriteProductId);

    expect(axiosFetch.history[0].url).includes(createFavoriteProductRoute);
    expect(axiosFetch.history[0].withCredentials).toEqual(true);
    expect(axiosFetch.history[0].data).includes(
      JSON.stringify({
        productId: product._id,
        image: product.img,
        name: product.model,
        price: product.price,
      }),
    );
    expect(axiosFetch.history[1]).toBeUndefined();
    expect(spyInvalidateQueries).toHaveBeenNthCalledWith(1, {
      queryKey: ['favorite-products', 'all-favorites-products'],
    });
    expect(spyInvalidateQueries).toHaveBeenNthCalledWith(2, {
      queryKey: ['favorite-products', product._id],
    });
  });

  it('should invocation toast error function when is api request fails', async () => {
    axiosFetch.onPost(createFavoriteProductRoute).reply(401);
    const { result } = renderHook(() => useFavoriteProduct(product), { wrapper });

    expect(result.current.IsFavoriteProduct).toBeFalsy();

    await waitFor(result.current.handleAddRemoveFavoriteProductId);

    expect(toast.error).toHaveBeenCalled();
  });
});
