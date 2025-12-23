import { axiosBackEndAPI } from '@/lib/axios';
import { expect, it } from 'vitest';
import { describe } from 'vitest';
import axiosMockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import { TabsViews } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { beforeEach } from 'vitest';
import { afterEach } from 'vitest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import userEvent from '@testing-library/user-event';
import { HashRouter, Route, Routes } from 'react-router-dom';

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

describe('Tabs View component', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const deliveriesProductRoutes = '/api/products/delivery';
  const favoriteProductRoutes = '/api/products/favorite';
  const userEvents = userEvent.setup();
  const products = Array.from({ length: 3 }).map(() => ({
    productId: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 156899, max: 347299 }),
    id: faker.database.mongodbObjectId(),
  }));
  const favoriteProducts = products.map((product) => ({
    ...product,
    createAt: faker.date.past().toISOString(),
  }));
  const deliveriesProducts = products.map((product) => ({
    ...product,
    deliveryDate: faker.date.past().toISOString(),
  }));

  beforeEach(() => {
    axiosFetch.onGet(favoriteProductRoutes).reply(200, favoriteProducts);
    axiosFetch.onGet(deliveriesProductRoutes).reply(200, deliveriesProducts);
  });

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should showing card from delivery when clicked in Enviados button', async () => {
    render(<TabsViews />, { wrapper });

    expect(screen.queryByLabelText(/loading delivery cards/i)).toBeNull();
    await screen.findByLabelText(/favorite cards/i);

    await userEvents.click(screen.getByText(/Enviados/i));

    expect(screen.queryByLabelText(/loading favorite cards/i)).toBeNull();
    await screen.findByLabelText(/delivery cards/i);
  });

  it('should showing card from favorite when clicked in Favoritos button', async () => {
    render(<TabsViews />, { wrapper });

    await userEvents.click(screen.getByText(/Enviados/i));

    expect(screen.queryByLabelText(/loading favorite cards/i)).toBeNull();
    await screen.findByLabelText(/delivery cards/i);

    await userEvents.click(screen.getByText(/Favoritos/i));

    expect(screen.queryByLabelText(/loading delivery cards/i)).toBeNull();
    await screen.findByLabelText(/favorite cards/i);
  });
});
