import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { env } from '@/env';
import { http, HttpResponse } from 'msw';

const product = {
  _id: faker.database.mongodbObjectId(),
  price: faker.number.int({ min: 156899, max: 347499 }),
  model: faker.commerce.productName(),
  img: faker.image.url({ height: 125, width: 125 }),
  slide: {
    slide1: faker.image.url({ height: 125, width: 125 }),
    slide2: faker.image.url({ height: 125, width: 125 }),
    slide3: faker.image.url({ height: 125, width: 125 }),
  },
  screen: faker.commerce.productMaterial(),
  processor: faker.commerce.productMaterial(),
  memory: faker.commerce.productMaterial(),
  placeVideo: faker.commerce.productMaterial(),
  battery: faker.commerce.productMaterial(),
  category: faker.commerce.department(),
};

const MetaProductCard: Meta<typeof ProductCard> = {
  title: 'Pages/Home/Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: { ...product },
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="*" element={<div style={{ maxWidth: '229px' }}>{Story()}</div>} />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    );
  },
  parameters: {
    layout: 'centered',
  },
};

export default MetaProductCard;

export const Default: StoryObj<typeof ProductCard> = {};

export const favorite: StoryObj<typeof ProductCard> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/products/favorite`, () => {
          return HttpResponse.json([
            {
              productId: product._id,
              image: product.img,
              name: product.model,
              price: product.price,
              id: faker.database.mongodbObjectId(),
              createAt: faker.date.past().toISOString(),
            },
          ]);
        }),
      ],
    },
  },
};
