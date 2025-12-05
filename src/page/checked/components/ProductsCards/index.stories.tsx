import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductsCards } from '.';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { configureStore } from '@reduxjs/toolkit';

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

const MetaProductsCards: Meta<typeof ProductsCards> = {
  title: 'Pages/Checked/Components/ProductsCards',
  component: ProductsCards,
  tags: ['autodocs'],
  decorators: (Story) => {
    return (
      <Provider
        store={configureStore({
          reducer: { cart: cartReducer },
          preloadedState: { cart: cartProductsCache },
        })}>
        <HashRouter>
          <Routes>
            <Route path="*" element={<div style={{ width: '669px' }}>{Story()}</div>} />
          </Routes>
        </HashRouter>
      </Provider>
    );
  },
  parameters: {
    layout: 'centered',
  },
};

export default MetaProductsCards;

export const Default: StoryObj<typeof ProductsCards> = {};
