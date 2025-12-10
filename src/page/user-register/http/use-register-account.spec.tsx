import { axiosBackEndAPI } from '@/lib/axios';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useRegisterAccount } from './use-register-account';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { faker } from '@faker-js/faker/locale/pt_BR';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('user register account request', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const userRegisterRoute = '/api/users/register';
  const userRegister = {
    full_name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.database.mongodbObjectId(),
    cep: faker.location.zipCode(),
    auto_connection: true,
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should config request corrected', async () => {
    axiosFetch.onPost(userRegisterRoute).reply(201);
    const { result } = renderHook(useRegisterAccount, { wrapper });

    await waitFor(() => result.current.mutateAsync(userRegister));

    const userRegisterRequest = axiosFetch.history[0];

    const { auto_connection, full_name, ...userRegisterRest } = userRegister;
    expect(userRegisterRequest).includes({
      url: userRegisterRoute,
      method: 'post',
      withCredentials: true,
    });
    expect(JSON.parse(userRegisterRequest.data)).toMatchObject({
      name: userRegister.full_name,
      stayConnected: userRegister.auto_connection,
      ...userRegisterRest,
    });
    expect(userRegisterRequest.headers).includes({
      'Content-Type': 'application/json',
    });
  });
});
