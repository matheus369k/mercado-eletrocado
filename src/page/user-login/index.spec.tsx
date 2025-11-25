import { axiosBackEndAPI } from '@/lib/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import type { ReactNode } from 'react';
import { afterEach, expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { vi } from 'vitest';
import { UserLogin } from '.';
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
  const userLoginRoute = '/api/users/login';

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('no should submitted when value in the input not valid', async () => {
    axiosFetch.onPost(userLoginRoute).reply(200);
    render(<UserLogin />, { wrapper });

    await userEvents.click(screen.getByRole('button', { name: /Entrar/ }));

    expect(axiosFetch.history[0]).toBeUndefined();

    await userEvents.type(screen.getByLabelText(/email/), 'test');
    await userEvents.type(screen.getByLabelText(/password/), 'test1234');
    await userEvents.click(screen.getByRole('button', { name: /Entrar/ }));

    expect(axiosFetch.history[0]).toBeUndefined();
  });

  it('should submitted form', async () => {
    axiosFetch.onPost(userLoginRoute).reply(200);
    render(<UserLogin />, { wrapper });

    await userEvents.type(screen.getByLabelText(/email/), 'test@gmail.com');
    await userEvents.type(screen.getByLabelText(/password/), 'test1234');
    await userEvents.click(screen.getByRole('button', { name: /Entrar/ }));

    const requestStories = axiosFetch.history[0];
    expect(requestStories.url).toBe(userLoginRoute);
  });
});
