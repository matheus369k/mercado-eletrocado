import type { Meta, StoryObj } from '@storybook/react-vite';
import { FavoriteProducts } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { http, HttpResponse, delay } from 'msw';
import { env } from '@/env';
import { faker } from '@faker-js/faker/locale/pt_BR';

const favoriteProducts = Array.from({ length: 5 }).map(() => ({
  productId: faker.database.mongodbObjectId(),
  image: faker.image.url({ width: 250, height: 250 }),
  name: faker.commerce.productName(),
  price: faker.number.int({ min: 156899, max: 347299 }),
  id: faker.database.mongodbObjectId(),
  createAt: faker.date.past().toISOString(),
}));

const MetaFavoriteProducts: Meta<typeof FavoriteProducts> = {
  title: 'Pages/UserProfile/Components/Favorite',
  component: FavoriteProducts,
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

export default MetaFavoriteProducts;

export const Default: StoryObj<typeof FavoriteProducts> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/products/favorite`, () => {
          return HttpResponse.json(favoriteProducts, { status: 200 });
        }),
      ],
    },
  },
};

export const EmptyFavorite: StoryObj<typeof FavoriteProducts> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/products/favorite`, () => {
          return HttpResponse.error();
        }),
      ],
    },
  },
};

export const LoadingFavorite: StoryObj<typeof FavoriteProducts> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/products/favorite`, () => {
          return delay('infinite');
        }),
      ],
    },
  },
};
