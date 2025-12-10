import { axiosBackEndAPI } from '@/lib/axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { renderHook, waitFor } from '@testing-library/react';
import axiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { useGenerateAccessToken } from './use-generate-access-token';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('delete favorite product', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const tokenRoute = '/token';

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should checked configuration from generate new access token', async () => {
    axiosFetch.onGet(tokenRoute).reply(200);
    const { result } = renderHook(useGenerateAccessToken, { wrapper });

    await waitFor(result.current.mutateAsync);

    const deleteFavoriteProductRequest = axiosFetch.history[0];
    expect(deleteFavoriteProductRequest).includes({
      url: tokenRoute,
      method: 'get',
      withCredentials: true,
    });
  });
});
