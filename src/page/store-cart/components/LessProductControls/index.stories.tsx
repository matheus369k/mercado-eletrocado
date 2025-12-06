import type { Meta, StoryObj } from '@storybook/react-vite';
import { LessProductControls, type LessProductControlsProps } from '.';
import { ProductsLessProvider } from '../../contexts/products-less';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/cart/slice';

const cartProducts = Array.from({ length: 3 }).map(() => ({
  _id: faker.database.mongodbObjectId(),
  price: faker.number.int({ min: 156899, max: 347499 }),
  model: faker.commerce.productName(),
  img: faker.image.url(),
  slide: {
    slide1: faker.image.url(),
    slide2: faker.image.url(),
    slide3: faker.image.url(),
  },
  screen: faker.commerce.productMaterial(),
  processor: faker.commerce.productMaterial(),
  memory: faker.commerce.productMaterial(),
  placeVideo: faker.commerce.productMaterial(),
  battery: faker.commerce.productMaterial(),
  category: faker.commerce.department(),
}));
const totalPrice = cartProducts.reduce((acc, curr) => acc + curr.price * 5, 0);
const cart = {
  cartProducts: cartProducts.map((product) => ({
    data: product,
    quantity: 5,
  })),
  totalPrice,
};

const MetaLessProductControls: Meta<LessProductControlsProps> = {
  title: 'Pages/StoreCart/Components/LessProductControls',
  component: LessProductControls,
  tags: ['autodocs'],
  decorators: (Story) => (
    <Provider
      store={configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: { cart },
      })}>
      <ProductsLessProvider>
        <div style={{ width: '149px' }}>{Story()}</div>
      </ProductsLessProvider>
    </Provider>
  ),
  args: { _id: cartProducts[0]._id },
  parameters: { layout: 'centered' },
};

export default MetaLessProductControls;

export const Default: StoryObj<LessProductControlsProps> = {};
