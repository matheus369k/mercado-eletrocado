import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeliveriesProducts } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { http, HttpResponse, delay } from 'msw';
import { env } from '@/env';
import { faker } from '@faker-js/faker/locale/pt_BR';

const deliveriesProducts = Array.from({ length: 5 }).map(() => ({
  productId: faker.database.mongodbObjectId(),
  image: faker.image.url({ width: 250, height: 250 }),
  name: faker.commerce.productName(),
  price: faker.number.int({ min: 156899, max: 347299 }),
  id: faker.database.mongodbObjectId(),
  deliveryDate: faker.date.past().toISOString(),
}));

const MetaDeliveriesProducts: Meta<typeof DeliveriesProducts> = {
  title: 'Pages/UserProfile/Components/Delivery',
  component: DeliveriesProducts,
  tags: ['autodocs'],
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="*" element={Story()} />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    );
  },
};

export default MetaDeliveriesProducts;

export const Default: StoryObj<typeof DeliveriesProducts> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/products/delivery`, () => {
          return HttpResponse.json(deliveriesProducts, { status: 200 });
        }),
      ],
    },
  },
};

export const EmptyDelivery: StoryObj<typeof DeliveriesProducts> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/products/delivery`, () => {
          return HttpResponse.error();
        }),
      ],
    },
  },
};

export const LoadingDelivery: StoryObj<typeof DeliveriesProducts> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/products/delivery`, () => {
          return delay('infinite');
        }),
      ],
    },
  },
};
