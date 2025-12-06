import type { Meta, StoryObj } from '@storybook/react-vite';
import { StoreCart } from '.';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter, Route, Routes } from 'react-router-dom';
import cartReducer from '@/redux/cart/slice';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const cartProducts = Array.from({ length: 3 }).map(() => {
  const slide = {
    slide1: faker.image.url({ width: 250, height: 250 }),
    slide2: faker.image.url({ width: 250, height: 250 }),
    slide3: faker.image.url({ width: 250, height: 250 }),
  };

  return {
    _id: faker.database.mongodbObjectId(),
    price: faker.number.int({ min: 156899, max: 347499 }),
    model: faker.commerce.productName(),
    screen: faker.commerce.productMaterial(),
    processor: faker.commerce.productMaterial(),
    memory: faker.commerce.productMaterial(),
    placeVideo: faker.commerce.productMaterial(),
    battery: faker.commerce.productMaterial(),
    category: faker.commerce.department(),
    img: slide.slide1,
    slide,
  };
});

const totalPrice = cartProducts.reduce((acc, curr) => acc + curr.price * 5, 0);
const cart = {
  cartProducts: cartProducts.map((product) => ({
    data: product,
    quantity: 5,
  })),
  totalPrice,
};

const MetaStoreCart: Meta<typeof StoreCart> = {
  title: 'Pages/StoreCart',
  component: StoreCart,
  tags: ['autodocs'],
};

export default MetaStoreCart;

export const Default: StoryObj<typeof StoreCart> = {
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Provider
          store={configureStore({
            reducer: {
              cart: cartReducer,
            },
            preloadedState: { cart },
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
};

export const EmptyCart: StoryObj<typeof StoreCart> = {
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Provider
          store={configureStore({
            reducer: {
              cart: cartReducer,
            },
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
};
