import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import { useUpdateForm } from './use-update-form';
import { faker } from '@faker-js/faker/locale/pt_BR';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

vi.mock('react-router-dom');

describe('update profile custom hook', () => {
  const formDefaultValue = {
    full_name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    avatar: null,
  };

  afterEach(() => {
    queryClient.clear();
  });

  it('should returned initial value', () => {
    const { result } = renderHook(useUpdateForm, { wrapper, initialProps: formDefaultValue });

    expect(result.current.previewUrl).toBeNull();
    const { getValues } = result.current.hookUseForm;
    expect(getValues('avatar')).toBeUndefined();
    expect(getValues('full_name')).toBe(formDefaultValue.full_name);
    expect(getValues('cep')).toBe(formDefaultValue.cep);
  });
});
