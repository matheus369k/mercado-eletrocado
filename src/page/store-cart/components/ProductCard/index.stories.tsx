import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
import { HashRouter, Route, Routes } from 'react-router-dom';

const slide = {
  slide1: faker.image.url({ width: 250, height: 250 }),
  slide2: faker.image.url({ width: 250, height: 250 }),
  slide3: faker.image.url({ width: 250, height: 250 }),
};

const cartProducts = [
  {
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
  },
];
const totalPrice = cartProducts.reduce((acc, curr) => acc + curr.price * 5, 0);
const cart = {
  cartProducts: cartProducts.map((product) => ({
    data: product,
    quantity: 5,
  })),
  totalPrice,
};

const MetaProductCard: Meta<typeof ProductCard> = {
  title: 'Pages/StoreCart/Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: (Story) => (
    <Provider
      store={configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: { cart },
      })}>
      <HashRouter>
        <Routes>
          <Route path="*" element={<div style={{ width: '249px' }}>{Story()}</div>} />
        </Routes>
      </HashRouter>
    </Provider>
  ),
  args: { ...cart.cartProducts[0] },
};

export default MetaProductCard;

export const Default: StoryObj<typeof ProductCard> = {};
