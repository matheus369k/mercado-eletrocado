import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductPage } from '.';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { http, HttpResponse } from 'msw';
import { env } from '@/env';

const slide = {
  slide1: faker.image.url({ width: 250, height: 250 }),
  slide2: faker.image.url({ width: 250, height: 250 }),
  slide3: faker.image.url({ width: 250, height: 250 }),
};

const product = {
  _id: faker.database.mongodbObjectId(),
  price: faker.number.int({ min: 156899, max: 347499 }),
  model: faker.commerce.productName(),
  screen: faker.commerce.productMaterial(),
  processor: faker.commerce.productMaterial(),
  memory: faker.commerce.productMaterial(),
  placeVideo: faker.commerce.productMaterial(),
  battery: faker.commerce.productMaterial(),
  category: 'notebook',
  img: slide.slide1,
  slide,
};

const MetaProduct: Meta<typeof ProductPage> = {
  title: 'Pages/Product',
  component: ProductPage,
  tags: ['autodocs'],
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={configureStore({ reducer: { cart: cartReducer } })}>
          <HashRouter>
            <Routes>
              <Route path="*" element={Story()} />
            </Routes>
          </HashRouter>
        </Provider>
      </QueryClientProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/products?productId=${product._id}`, () => {
          return HttpResponse.json(product);
        }),
      ],
    },
  },
};

export default MetaProduct;

export const Default: StoryObj<typeof ProductPage> = {};
