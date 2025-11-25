import { axiosBackEndAPI } from '@/lib/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import type { ReactNode } from 'react';
import { afterEach, expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { vi } from 'vitest';
import { UserRegister } from '.';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
}));

describe('user login page', () => {
  const userEvents = userEvent.setup();
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userRegisterRoute = '/api/users/register';

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('no should submitted when value in the input not valid', async () => {
    axiosFetch.onPost(userRegisterRoute).reply(200);
    render(<UserRegister />, { wrapper });

    await userEvents.click(screen.getByRole('button', { name: /Registra-se/ }));

    expect(axiosFetch.history[0]).toBeUndefined();

    await userEvents.type(screen.getByLabelText(/email/), 'test');
    await userEvents.type(screen.getByLabelText(/password/), 'test1234');
    await userEvents.click(screen.getByRole('button', { name: /Registra-se/ }));

    expect(axiosFetch.history[0]).toBeUndefined();

    await userEvents.type(screen.getByLabelText(/name/), 'user test');
    await userEvents.type(screen.getByLabelText(/cep/), '55475-000');
    await userEvents.click(screen.getByRole('button', { name: /Registra-se/ }));

    expect(axiosFetch.history[0]).toBeUndefined();
  });

  it('should submitted form', async () => {
    axiosFetch.onPost(userRegisterRoute).reply(200);
    render(<UserRegister />, { wrapper });

    await userEvents.type(screen.getByLabelText(/email/), 'test@gmail.com');
    await userEvents.type(screen.getByLabelText(/password/), 'test1234');
    await userEvents.type(screen.getByLabelText(/name/), 'user test');
    await userEvents.type(screen.getByLabelText(/cep/), '55475-000');
    await userEvents.click(screen.getByRole('button', { name: /Registra-se/ }));

    const requestStories = axiosFetch.history[0];
    expect(requestStories.url).toBe(userRegisterRoute);
  });

  it('no should submitted form when agree term not have checked', async () => {
    axiosFetch.onPost(userRegisterRoute).reply(200);
    render(<UserRegister />, { wrapper });

    await userEvents.type(screen.getByLabelText(/email/), 'test@gmail.com');
    await userEvents.type(screen.getByLabelText(/password/), 'test1234');
    await userEvents.type(screen.getByLabelText(/name/), 'user test');
    await userEvents.type(screen.getByLabelText(/cep/), '55475-000');
    await userEvents.click(screen.getByLabelText(/agree terms/));
    await userEvents.click(screen.getByRole('button', { name: /Registra-se/ }));

    expect(axiosFetch.history[0]).toBeUndefined();
  });
});
