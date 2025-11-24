import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import { ProductsCards } from '.';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker/locale/pt_BR';
import type { ReactNode } from 'react';
import cartReducer from '@/redux/cart/slice';
import userEvent from '@testing-library/user-event';
import { ROUTES_PATHNAMES } from '@/util/const';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
}));

const cartProductsCache = {
  cartProducts: Array.from({ length: 2 }).map(() => ({
    data: {
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
    },
    quantity: faker.number.int({ min: 1, max: 3 }),
  })),
  totalPrice: faker.number.int({ min: 1590, max: 3579 }),
};

const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider
      store={configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: { cart: cartProductsCache },
      })}>
      {children}
    </Provider>
  );
};

describe('product card component', () => {
  const userEvents = userEvent.setup();

  it('should redirect when is clicked on the product picture', async () => {
    const productId = cartProductsCache.cartProducts[0].data._id;
    render(<ProductsCards />, {
      wrapper,
    });

    const productCardLabelText = `product cart of picture - id ${productId}`;
    await userEvents.click(screen.getByLabelText(productCardLabelText));

    expect(mockNavigate).toBeCalledWith(ROUTES_PATHNAMES.PRODUCT.replace(':productId', productId));
  });

  it('should disabled prev button when is first card', () => {
    render(<ProductsCards />, {
      wrapper,
    });

    expect(screen.getByLabelText(/prev card/i)).toBeDisabled();
    expect(screen.getByLabelText(/next card/i)).not.toBeDisabled();
  });
});
