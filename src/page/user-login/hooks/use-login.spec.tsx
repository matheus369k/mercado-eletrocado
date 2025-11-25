import { axiosBackEndAPI } from '@/lib/axios';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useLogin } from './use-login';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { ROUTES_PATHNAMES } from '@/util/const';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

vi.mock('react-toastify');

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => vi.fn()),
}));

describe('user login request', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userLoginRoute = '/api/users/login';
  const userLogin = {
    email: 'test@gmail.com',
    password: 'test1234',
    auto_connection: true,
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should login request and redirect to home page when is call handleUserLogin', async () => {
    const mockReplace = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      replace: mockReplace,
    } as Location);
    axiosFetch.onPost(userLoginRoute).reply(201);
    const { result } = renderHook(useLogin, { wrapper });

    await waitFor(() => result.current.handleUserLogin(userLogin));
    const requestStories = axiosFetch.history[0];

    expect(requestStories.url).toBe(userLoginRoute);
    expect(mockReplace).toBeCalledWith(ROUTES_PATHNAMES.HOME);
  });

  it('should call message alert when is fall request', async () => {
    axiosFetch.onPost(userLoginRoute).reply(500);
    const { result } = renderHook(useLogin, { wrapper });

    await waitFor(() => result.current.handleUserLogin(userLogin));
    const requestStories = axiosFetch.history[0];

    expect(requestStories.url).toBe(userLoginRoute);
    expect(toast.error).toBeCalled();
  });
});
