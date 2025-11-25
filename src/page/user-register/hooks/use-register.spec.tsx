import { axiosBackEndAPI } from '@/lib/axios';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useRegister } from './use-register';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { ROUTES_PATHNAMES } from '@/util/const';
import { toast } from 'react-toastify';
import { faker } from '@faker-js/faker/locale/pt_BR';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

vi.mock('react-toastify');

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => vi.fn()),
}));

describe('user register request', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userRegisterRoute = '/api/users/register';
  const userRegister = {
    full_name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.database.mongodbObjectId(),
    cep: faker.location.zipCode(),
    auto_connection: true,
    agree_terms: true,
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should login request and redirect to home page when is call handleRegisterUserForm', async () => {
    const mockReplace = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({
      ...window.location,
      replace: mockReplace,
    } as Location);
    axiosFetch.onPost(userRegisterRoute).reply(201);
    const { result } = renderHook(useRegister, { wrapper });

    await waitFor(() => result.current.handleRegisterUserForm(userRegister));
    const requestStories = axiosFetch.history[0];

    expect(requestStories.url).toBe(userRegisterRoute);
    expect(mockReplace).toBeCalledWith(ROUTES_PATHNAMES.HOME);
  });

  it('should call message alert when is fall request', async () => {
    axiosFetch.onPost(userRegisterRoute).reply(500);
    const { result } = renderHook(useRegister, { wrapper });

    await waitFor(() => result.current.handleRegisterUserForm(userRegister));
    const requestStories = axiosFetch.history[0];

    expect(requestStories.url).toBe(userRegisterRoute);
    expect(toast.error).toBeCalled();
  });
});
