import { axiosBackEndAPI } from '@/lib/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { it, vi } from 'vitest';
import { describe } from 'vitest';
import axiosMockAdapter from 'axios-mock-adapter';
import userEvent from '@testing-library/user-event';
import { afterEach } from 'vitest';
import { UserProfile } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { beforeEach } from 'vitest';
import { expect } from 'vitest';
import { ROUTES_PATHNAMES } from '@/util/const';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
  useLocation: vi.fn(() => ({ pathname: 'http://localhost:3000' })),
}));

describe('user update page', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const deliveriesProductRoutes = '/api/products/delivery';
  const favoriteProductRoutes = '/api/products/favorite';
  const userAccountRoute = '/api/users/profile';
  const userEvents = userEvent.setup();
  const userProfileAccount = {
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    id: faker.database.mongodbObjectId(),
  };
  const products = Array.from({ length: 3 }).map(() => ({
    productId: faker.database.mongodbObjectId(),
    image: faker.image.url(),
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 156899, max: 347299 }),
    id: faker.database.mongodbObjectId(),
  }));
  const favoriteProducts = products.map((product) => ({
    ...product,
    createAt: faker.date.past().toISOString(),
  }));
  const deliveriesProducts = products.map((product) => ({
    ...product,
    deliveryDate: faker.date.past().toISOString(),
  }));

  beforeEach(() => {
    axiosFetch.onGet(favoriteProductRoutes).reply(200, favoriteProducts);
    axiosFetch.onGet(deliveriesProductRoutes).reply(200, deliveriesProducts);
    axiosFetch.onGet(userAccountRoute).reply(200, userProfileAccount);
  });

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should initial with model hidden and with favorites product visible', () => {
    render(<UserProfile />, { wrapper });

    expect(screen.queryByLabelText(/loading delivery cards/i)).toBeNull();
    screen.getByLabelText(/loading favorite cards/i);

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
    expect(screen.getByLabelText(/model userDelete root/i)).toHaveAttribute('data-open', 'false');
    expect(screen.getByLabelText(/model userLogout root/i)).toHaveAttribute('data-open', 'false');
    expect(screen.getByLabelText(/model updateProfile root/i)).toHaveAttribute(
      'data-open',
      'false',
    );
  });

  it('should showing card from delivery when clicked in Enviados button', async () => {
    render(<UserProfile />, { wrapper });

    expect(screen.queryByLabelText(/loading delivery cards/i)).toBeNull();
    await screen.findByLabelText(/favorite cards/i);

    await userEvents.click(screen.getByText(/Enviados/i));

    expect(screen.queryByLabelText(/loading favorite cards/i)).toBeNull();
    await screen.findByLabelText(/delivery cards/i);
  });

  it('should showing card from favorite when clicked in Favoritos button', async () => {
    render(<UserProfile />, { wrapper });

    await userEvents.click(screen.getByText(/Enviados/i));

    expect(screen.queryByLabelText(/loading favorite cards/i)).toBeNull();
    await screen.findByLabelText(/delivery cards/i);

    await userEvents.click(screen.getByText(/Favoritos/i));

    expect(screen.queryByLabelText(/loading delivery cards/i)).toBeNull();
    await screen.findByLabelText(/favorite cards/i);
  });

  it('should open setting dropdown when clicked in setting icon', async () => {
    render(<UserProfile />, { wrapper });

    await userEvents.click(screen.getByLabelText(/dropdown setting toggle/i));

    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'true');
  });

  it('should open update profile model when clicked in setting icon > Atualizar Perfil', async () => {
    render(<UserProfile />, { wrapper });

    await userEvents.click(screen.getByLabelText(/dropdown setting toggle/i));
    await userEvents.click(screen.getByLabelText(/model updateProfile toggle/i));

    expect(screen.getByLabelText(/model updateProfile root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should close update profile model when clicked in setting icon > Atualizar Perfil > close icon', async () => {
    render(<UserProfile />, { wrapper });

    const settingIconButton = screen.getByLabelText(/dropdown setting toggle/i);
    await userEvents.click(settingIconButton);
    const updateProfileButton = screen.getByLabelText(/model updateProfile toggle/i);
    await userEvents.click(updateProfileButton);

    expect(screen.getByLabelText(/model updateProfile root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    const closeIconButton = screen.getAllByLabelText(/model updateProfile close/i)[0];
    await userEvents.click(closeIconButton);

    expect(screen.getByLabelText(/model updateProfile root/i)).toHaveAttribute(
      'data-open',
      'false',
    );
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should close update profile model when clicked in setting icon > Atualizar Perfil > cancelar', async () => {
    render(<UserProfile />, { wrapper });

    const settingIconButton = screen.getByLabelText(/dropdown setting toggle/i);
    await userEvents.click(settingIconButton);
    const updateProfileButton = screen.getByLabelText(/model updateProfile toggle/i);
    await userEvents.click(updateProfileButton);

    expect(screen.getByLabelText(/model updateProfile root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    const cancelButton = screen.getAllByLabelText(/model updateProfile close/i)[1];
    await userEvents.click(cancelButton);

    expect(screen.getByLabelText(/model updateProfile root/i)).toHaveAttribute(
      'data-open',
      'false',
    );
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should open logout model when clicked in setting icon > Desconectar-se', async () => {
    render(<UserProfile />, { wrapper });

    await userEvents.click(screen.getByLabelText(/dropdown setting toggle/i));
    await userEvents.click(screen.getByLabelText(/model userLogout toggle/i));

    expect(screen.getByLabelText(/model userLogout root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should close logout model when clicked in setting icon > Desconectar-se > close icon', async () => {
    render(<UserProfile />, { wrapper });

    const settingIconButton = screen.getByLabelText(/dropdown setting toggle/i);
    await userEvents.click(settingIconButton);
    const logoutButton = screen.getByLabelText(/model userLogout toggle/i);
    await userEvents.click(logoutButton);

    expect(screen.getByLabelText(/model userLogout root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    const closeIconButton = screen.getAllByLabelText(/model userLogout close/i)[0];
    await userEvents.click(closeIconButton);

    expect(screen.getByLabelText(/model userLogout root/i)).toHaveAttribute('data-open', 'false');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should close logout model when clicked in setting icon > Desconectar-se > cancelar', async () => {
    render(<UserProfile />, { wrapper });

    const settingIconButton = screen.getByLabelText(/dropdown setting toggle/i);
    await userEvents.click(settingIconButton);
    const logoutButton = screen.getByLabelText(/model userLogout toggle/i);
    await userEvents.click(logoutButton);

    expect(screen.getByLabelText(/model userLogout root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    const cancelButton = screen.getAllByLabelText(/model userLogout close/i)[1];
    await userEvents.click(cancelButton);

    expect(screen.getByLabelText(/model userLogout root/i)).toHaveAttribute('data-open', 'false');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should logout when clicked in setting icon > Desconectar-se > Confirmar', async () => {
    axiosFetch.onDelete('/api/users/delete').reply(200);
    axiosFetch.onDelete('/token').reply(200);
    const mockReplace = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      replace: mockReplace,
    } as Location);
    render(<UserProfile />, { wrapper });

    const settingIconButton = screen.getByLabelText(/dropdown setting toggle/i);
    await userEvents.click(settingIconButton);
    const logoutButton = screen.getByLabelText(/model userLogout toggle/i);
    await userEvents.click(logoutButton);

    expect(screen.getByLabelText(/model userLogout root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    const confirmButton = screen.getByRole('button', { name: /confirm logout/i });
    await userEvents.click(confirmButton);

    expect(mockReplace).toHaveBeenCalledWith(ROUTES_PATHNAMES.HOME);
  });

  it('should open delete account model when clicked in setting icon > Deletar Conta', async () => {
    render(<UserProfile />, { wrapper });

    await userEvents.click(screen.getByLabelText(/dropdown setting toggle/i));
    await userEvents.click(screen.getByLabelText(/model userDelete toggle/i));

    expect(screen.getByLabelText(/model userDelete root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should close delete account model when clicked in setting icon > Deletar Conta > close icon', async () => {
    render(<UserProfile />, { wrapper });

    const settingIconButton = screen.getByLabelText(/dropdown setting toggle/i);
    await userEvents.click(settingIconButton);
    const deleteAccountButton = screen.getByLabelText(/model userDelete toggle/i);
    await userEvents.click(deleteAccountButton);

    expect(screen.getByLabelText(/model userDelete root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    const closeIconButton = screen.getAllByLabelText(/model userDelete close/i)[0];
    await userEvents.click(closeIconButton);

    expect(screen.getByLabelText(/model userDelete root/i)).toHaveAttribute('data-open', 'false');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should close delete account model when clicked in setting icon > Deletar Conta > cancelar', async () => {
    render(<UserProfile />, { wrapper });

    const settingIconButton = screen.getByLabelText(/dropdown setting toggle/i);
    await userEvents.click(settingIconButton);
    const deleteAccountButton = screen.getByLabelText(/model userDelete toggle/i);
    await userEvents.click(deleteAccountButton);

    expect(screen.getByLabelText(/model userDelete root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    const cancelButton = screen.getAllByLabelText(/model userDelete close/i)[1];
    await userEvents.click(cancelButton);

    expect(screen.getByLabelText(/model userDelete root/i)).toHaveAttribute('data-open', 'false');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');
  });

  it('should delete account when clicked in setting icon > Deletar Conta > Confirmar', async () => {
    axiosFetch.onDelete('/api/users/delete').reply(200);
    axiosFetch.onDelete('/token').reply(200);
    const mockReplace = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      replace: mockReplace,
    } as Location);
    render(<UserProfile />, { wrapper });

    const settingIconButton = screen.getByLabelText(/dropdown setting toggle/i);
    await userEvents.click(settingIconButton);
    const deleteAccountButton = screen.getByLabelText(/model userDelete toggle/i);
    await userEvents.click(deleteAccountButton);

    expect(screen.getByLabelText(/model userDelete root/i)).toHaveAttribute('data-open', 'true');
    expect(screen.getByLabelText(/dropdown setting root/i)).toHaveAttribute('data-open', 'false');

    const confirmButton = screen.getByRole('button', { name: /confirm delete/i });
    await userEvents.click(confirmButton);

    expect(mockReplace).toHaveBeenCalledWith(ROUTES_PATHNAMES.HOME);
  });
});
