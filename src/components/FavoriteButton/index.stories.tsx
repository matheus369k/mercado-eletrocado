import type { Meta, StoryObj } from '@storybook/react-vite';
import { FavoriteButton, type FavoriteButtonProps } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { http, HttpResponse } from 'msw';
import { env } from '@/env';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';

const favoriteProduct = {
  _id: faker.database.mongodbObjectId(),
  img: faker.image.url(),
  model: faker.commerce.productName(),
  price: faker.number.int({ min: 135000, max: 357099 }),
};

const MetaFavoriteButton: Meta<FavoriteButtonProps> = {
  title: 'Components/FavoriteButton',
  component: FavoriteButton,
  args: { ...favoriteProduct, customClass: 'null' },
  tags: ['autodocs'],
  decorators: (Story) => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route
              path="*"
              element={
                <div style={{ position: 'relative', width: '48px', height: '48px' }}>{Story()}</div>
              }
            />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    );
  },
  argTypes: {
    customClass: { control: 'select', options: ['none', 'product_selected', 'user_profiler'] },
  },
  parameters: {
    layout: 'centered',
  },
};

export default MetaFavoriteButton;

export const Default: StoryObj<FavoriteButtonProps> = {};

export const Active: StoryObj<FavoriteButtonProps> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/products/favorite`, () => {
          return HttpResponse.json([
            {
              productId: favoriteProduct._id,
              image: favoriteProduct.img,
              name: favoriteProduct.model,
              price: favoriteProduct.price,
              id: faker.database.mongodbObjectId(),
              createAt: faker.date.past().toISOString(),
            },
          ]);
        }),
      ],
    },
  },
};
