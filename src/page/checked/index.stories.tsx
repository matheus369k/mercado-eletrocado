import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckedPage } from '.';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { faker } from '@faker-js/faker/locale/pt_BR';
import cartReducer from '@/redux/cart/slice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { env } from '@/env';

const cartProductsCache = {
  cartProducts: Array.from({ length: 8 }).map(() => ({
    data: {
      _id: faker.database.mongodbObjectId(),
      price: faker.number.int({ min: 156899, max: 347499 }),
      model: faker.commerce.productName(),
      img: faker.image.url({ width: 250, height: 250 }),
      slide: {
        slide1: faker.image.url({ width: 250, height: 250 }),
        slide2: faker.image.url({ width: 250, height: 250 }),
        slide3: faker.image.url({ width: 250, height: 250 }),
      },
      screen: faker.commerce.productMaterial(),
      processor: faker.commerce.productMaterial(),
      memory: faker.commerce.productMaterial(),
      placeVideo: faker.commerce.productMaterial(),
      battery: faker.commerce.productMaterial(),
      category: faker.commerce.department(),
    },
    quantity: faker.number.int({ min: 1, max: 3 }),
  })),
  totalPrice: faker.number.int({ min: 1590, max: 3579 }),
};

const MetaChecked: Meta<typeof CheckedPage> = {
  title: 'Pages/Checked',
  component: CheckedPage,
  tags: ['autodocs'],
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Provider
          store={configureStore({
            reducer: { cart: cartReducer },
            preloadedState: { cart: cartProductsCache },
          })}>
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
        http.get(`${env.VITE_DATABASE_URL}/api/users/profile`, () => {
          return HttpResponse.json({
            avatar: faker.image.avatar(),
            email: faker.internet.email(),
            name: faker.person.fullName(),
            cep: faker.location.zipCode(),
            id: faker.database.mongodbObjectId(),
          });
        }),
      ],
    },
  },
};

export default MetaChecked;

export const Default: StoryObj<typeof CheckedPage> = {};
