import type { Meta, StoryObj } from '@storybook/react-vite';
import { BuyProductControls } from '.';
import { ProductsAmountProvider } from '../../contexts/products-amount';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { configureStore } from '@reduxjs/toolkit';

const product = {
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
  category: 'notebook',
};

const MetaBuyProductControls: Meta<typeof BuyProductControls> = {
  title: 'Pages/Product/Components/BuyProductControls',
  component: BuyProductControls,
  tags: ['autodocs'],
  decorators: (Story) => (
    <Provider store={configureStore({ reducer: { cart: cartReducer } })}>
      <ProductsAmountProvider>
        <div style={{ width: '549px' }}>{Story()}</div>
      </ProductsAmountProvider>
    </Provider>
  ),
  parameters: { layout: 'centered' },
  args: { data: product },
};

export default MetaBuyProductControls;

export const Default: StoryObj<typeof BuyProductControls> = {};
