import { configureStore } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import cartReducer from '@/redux/cart/slice';
import { afterEach, describe, expect, it } from 'vitest';
import { axiosBackEndAPI } from '@/lib/axios';
import axiosMockAdapter from 'axios-mock-adapter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, cleanup, screen } from '@testing-library/react';
import { Navbar } from '.';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { BROWSER_STORAGE_KEYS, ROUTES_PATHNAMES } from '@/util/const';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
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
            <Route path="*" element={children} />
          </Routes>
        </HashRouter>
      </Provider>
    </QueryClientProvider>
  );
};

describe('navbar component', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userProfileAccountRoute = '/api/users/profile';
  const userEvents = userEvent.setup();
  const userProfileAccount = {
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    id: faker.database.mongodbObjectId(),
  };
  const cartProductsCache = {
    cartProducts: Array.from({ length: 2 }).map(() => {
      return {
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
      };
    }),
    totalPrice: faker.number.int({ min: 1590, max: 3579 }),
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should render mobile menu when is width is less than 769px', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    render(<Navbar />, { wrapper });

    await screen.findByRole('button', { name: /dropdown navbarMenu toggle/i });
    expect(screen.queryByLabelText(/dropdown userWithoutAccount toggle/i)).toBeNull();
    expect(screen.getByLabelText(/dropdown navbarMenu root/i)).toHaveAttribute(
      'data-open',
      'false',
    );
    await screen.findByText(/Registrar-se/i);
    screen.getByText(/Entrar/i);
    expect(screen.queryByText(/Usuário/i)).toBeNull();
  });

  it('should render mobile menu and open when is clicked in toggle menu icon', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    render(<Navbar />, { wrapper });

    const toggleMenuBtn = await screen.findByRole('button', {
      name: /dropdown navbarMenu toggle/i,
    });
    await userEvents.click(toggleMenuBtn);

    const dropdownRoot = screen.getByLabelText(/dropdown navbarMenu root/i);
    expect(dropdownRoot).toHaveAttribute('data-open', 'true');
  });

  it('should render mobile menu when user already account', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<Navbar />, { wrapper });

    await screen.findByLabelText(/dropdown navbarMenu toggle/i);
    expect(screen.queryByLabelText(/dropdown userWithoutAccount toggle/i)).toBeNull();
    await screen.findByText(/Usuário/i);
    expect(screen.queryByText(/Registrar-se/i)).toBeNull();
    expect(screen.queryByText(/Entrar/i)).toBeNull();
  });

  it('should render desktop menu when is width is greater than 769px', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    render(<Navbar />, { wrapper });

    await screen.findByLabelText(/dropdown userWithoutAccount toggle/i);
    expect(screen.queryByRole('button', { name: /dropdown navbarMenu toggle/i })).toBeNull();
    expect(screen.getByLabelText(/dropdown userWithoutAccount root/i)).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('should render desktop menu and open when is clicked in toggle user dropdown option', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    render(<Navbar />, { wrapper });

    const toggleUserBtn = await screen.findByRole('button', {
      name: /dropdown userWithoutAccount toggle/i,
    });
    await userEvents.click(toggleUserBtn);

    const dropdownRoot = screen.getByLabelText(/dropdown userWithoutAccount root/i);
    expect(dropdownRoot).toHaveAttribute('data-open', 'true');
  });

  it('should render desktop menu when user already account', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    render(<Navbar />, { wrapper });

    await screen.findByLabelText(/dropdown userWithoutAccount toggle/i);
    expect(screen.queryByLabelText(/dropdown navbarMenu toggle/i)).toBeNull();
    await screen.findByText(/Usuário/i);
    expect(screen.queryByText(/Registrar-se/i)).toBeNull();
    expect(screen.queryByText(/Entrar/i)).toBeNull();
  });

  it('should restore carts datas when is user already account and have cache saved', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    window.localStorage.setItem(
      BROWSER_STORAGE_KEYS.CART_PRODUCT,
      JSON.stringify(cartProductsCache),
    );
    render(<Navbar />, { wrapper });

    await screen.findByLabelText(/dropdown userWithoutAccount toggle/i);
    await screen.findByLabelText(/carts count/i);

    window.localStorage.removeItem(BROWSER_STORAGE_KEYS.CART_PRODUCT);
  });

  it('no should restore carts datas when user not have account', async () => {
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    window.localStorage.setItem(
      BROWSER_STORAGE_KEYS.CART_PRODUCT,
      JSON.stringify(cartProductsCache),
    );
    render(<Navbar />, { wrapper });

    await screen.findByLabelText(/dropdown userWithoutAccount toggle/i);
    expect(screen.queryByLabelText(/carts count/i)).toBeNull();

    window.localStorage.removeItem(BROWSER_STORAGE_KEYS.CART_PRODUCT);
  });

  it('should render desktop menu and redirect route to home page when is clicked in Produtos', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByText(/Produtos/i));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.HOME);
  });

  it('should render desktop menu and redirect route to cart page when is clicked in Carrinho', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByText(/Carrinho/i));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.CAR);
  });

  it('should render desktop menu and redirect route to profile page when is clicked in Usuário', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByRole('link', { name: /Usuário/i }));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.USER_PROFILER);
  });

  it('should render desktop menu and redirect route to register page when is clicked in Registrar-se', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByText(/Registrar-se/i));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.USER_REGISTER);
  });

  it('should render desktop menu and redirect route to login page when is clicked in Entrar', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    vi.spyOn(document.body, 'clientWidth', 'get').mockReturnValue(800);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByText(/Entrar/i));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.USER_LOGIN);
  });

  it('should render mobile menu and redirect route to home page when is clicked in Produtos', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByText(/Produtos/i));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.HOME);
  });

  it('should render mobile menu and redirect route to cart page when is clicked in Carrinho', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByText(/Carrinho/i));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.CAR);
  });

  it('should render mobile menu and redirect route to profile page when is clicked in Usuário', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(200, userProfileAccount);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByText(/Usuário/i));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.USER_PROFILER);
  });

  it('should render mobile menu and redirect route to register page when is clicked in Registrar-se', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByText(/Registrar-se/i));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.USER_REGISTER);
  });

  it('should render mobile menu and redirect route to login page when is clicked in Entrar', async () => {
    axiosFetch.onGet(userProfileAccountRoute).reply(401);
    render(<Navbar />, { wrapper });

    await userEvents.click(await screen.findByText(/Entrar/i));

    expect(window.location.href).includes('#' + ROUTES_PATHNAMES.USER_LOGIN);
  });
});
