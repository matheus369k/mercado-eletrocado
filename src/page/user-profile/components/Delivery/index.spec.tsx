import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { axiosBackEndAPI } from '@/lib/axios';
import { DeliveriesProducts } from '.';
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

describe('delivery component', () => {
  const userEvents = userEvent.setup();
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const deliveriesProductRoutes = '/api/products/delivery';
  const deliveriesProducts = Array.from({ length: 3 }).map(() => {
    return {
      deliveryDate: faker.date.past().toISOString(),
      productId: faker.database.mongodbObjectId(),
      image: faker.image.url(),
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 156899, max: 347299 }),
      id: faker.database.mongodbObjectId(),
    };
  });

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should render empty component when not receive data', async () => {
    axiosFetch.onGet(deliveriesProductRoutes).reply(404);
    render(<DeliveriesProducts />, { wrapper });

    await screen.findByText(/Compre mais produtos.../i);
  });

  it('should render loading component when pending datas', () => {
    axiosFetch.onGet(deliveriesProductRoutes).reply(200, deliveriesProducts);
    render(<DeliveriesProducts />, { wrapper });

    screen.getByLabelText(/loading delivery cards/i);
  });

  it('should render delivery component when success datas', async () => {
    axiosFetch.onGet(deliveriesProductRoutes).reply(200, deliveriesProducts);
    render(<DeliveriesProducts />, { wrapper });

    await screen.findByLabelText(/delivery cards/i);
  });

  it('should redirected to product page when is clicked in image product card', async () => {
    axiosFetch.onGet(deliveriesProductRoutes).reply(200, deliveriesProducts);
    render(<DeliveriesProducts />, { wrapper });

    const product = deliveriesProducts[0];
    await userEvents.click(await screen.findByAltText(product.name));

    expect(mockNavigate).toBeCalledWith(
      ROUTES_PATHNAMES.PRODUCT.replace(':productId', product.productId),
    );
  });
});
