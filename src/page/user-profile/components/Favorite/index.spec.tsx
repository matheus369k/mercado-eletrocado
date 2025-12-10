import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FavoriteProducts } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { afterEach } from 'vitest';
import axiosMockAdapter from 'axios-mock-adapter';
import userEvent from '@testing-library/user-event';
import { ROUTES_PATHNAMES } from '@/util/const';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { experimental_prefetchInRender: true } },
});
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('favorite component', () => {
  const userEvents = userEvent.setup();
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const favoriteProductRoutes = '/api/products/favorite';
  const userAccountRoute = '/api/users/profile';
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

  const userProfileAccount = {
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    id: faker.database.mongodbObjectId(),
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should render empty component when not receive data', async () => {
    axiosFetch.onGet(favoriteProductRoutes).reply(200, []);
    render(<FavoriteProducts />, { wrapper });

    await screen.findByText(/Adicione mais produtos aos favoritos.../i);
  });

  it('should render loading component when pending datas', () => {
    axiosFetch.onGet(favoriteProductRoutes).reply(200, favoriteProducts);
    render(<FavoriteProducts />, { wrapper });

    screen.getByLabelText(/loading favorite cards/i);
  });

  it('should render favorite component when success datas', async () => {
    axiosFetch.onGet(favoriteProductRoutes).reply(200, favoriteProducts);
    render(<FavoriteProducts />, { wrapper });

    await screen.findByLabelText(/favorite cards/i);
  });

  it('should redirected to product page when is clicked in image product card', async () => {
    axiosFetch.onGet(favoriteProductRoutes).reply(200, favoriteProducts);
    render(<FavoriteProducts />, { wrapper });

    const product = favoriteProducts[0];
    await userEvents.click(await screen.findByAltText(product.name));

    expect(mockNavigate).toBeCalledWith(
      ROUTES_PATHNAMES.PRODUCT.replace(':productId', product.productId),
    );
  });

  it('should remove favorite product when is clicked in heart icon', async () => {
    const deleteFavoritesProductRoute = `${favoriteProductRoutes}/${favoriteProducts[0].productId}`;
    axiosFetch.onGet(favoriteProductRoutes).reply(200, favoriteProducts);
    axiosFetch.onGet(userAccountRoute).reply(200, userProfileAccount);
    axiosFetch.onDelete(deleteFavoritesProductRoute).reply(200);
    render(<FavoriteProducts />, { wrapper });

    const allFavoriteToggleButtons = await screen.findAllByLabelText(/remover dos favoritos/i);
    await userEvents.click(allFavoriteToggleButtons[0]);

    console.debug(axiosFetch.history);
    expect(axiosFetch.history[0]).includes({ method: 'get', url: favoriteProductRoutes });
    expect(axiosFetch.history[3]).includes({ method: 'delete', url: deleteFavoritesProductRoute });
  });
});
