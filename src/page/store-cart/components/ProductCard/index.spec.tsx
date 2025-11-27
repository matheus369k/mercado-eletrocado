import { render, renderHook, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import { ProductCard } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import userEvent from '@testing-library/user-event';
import { ROUTES_PATHNAMES } from '@/util/const';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
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
const totalPrice = cartProducts.reduce((acc, curr) => acc + curr.price, 0);

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider
      store={configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: {
          cart: {
            cartProducts: cartProducts.map((product) => ({
              data: product,
              quantity: faker.number.int({ min: 3, max: 5 }),
            })),
            totalPrice,
          },
        },
      })}>
      {children}
    </Provider>
  );
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
}));

describe('product card component', () => {
  const userEvents = userEvent.setup();

  it('should redirect to product page when is clicked product', async () => {
    render(<ProductCard data={cartProducts[0]} quantity={3} />, { wrapper });

    await userEvents.click(screen.getByLabelText(/cart product picture/i));

    expect(mockNavigate).toHaveBeenCalledWith(
      ROUTES_PATHNAMES.PRODUCT.replace(':productId', cartProducts[0]._id),
    );
  });
});
