import { axiosBackEndAPI } from '@/lib/axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import axiosMockAdapter from 'axios-mock-adapter';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { UpdateProfileModelForm } from '.';
import { DropdownModelRoot } from '@/components';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DropdownModelRoot mode="model" referenceId="updateProfile">
        {children}
      </DropdownModelRoot>
    </QueryClientProvider>
  );
};

vi.mock('react-toastify');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate),
  useLocation: vi.fn(() => ({ pathname: window.location.toString() })),
}));

describe('update profile model component', () => {
  const axiosFetch = new axiosMockAdapter(axiosBackEndAPI);
  const updateAccountRoute = '/api/users/update';
  const userEvents = userEvent.setup();
  const avatarImage = {
    file: new File(['avatar content'], 'avatar.png', {
      type: 'image/png',
    }),
    url: 'data:image/png;base64,YXZhdGFyIGNvbnRlbnQ=',
    path: 'C:\\fakepath\\avatar.png',
  };
  const formDefaultValue = {
    full_name: faker.person.fullName(),
    cep: faker.location.zipCode(),
    avatar: null,
  };

  afterEach(() => {
    queryClient.clear();
    axiosFetch.reset();
  });

  it('should insert initial values in inputs', async () => {
    render(<UpdateProfileModelForm {...formDefaultValue} />, { wrapper });

    expect(screen.getByLabelText(/full name field/i)).toHaveValue(formDefaultValue.full_name);
    expect(screen.getByLabelText(/cep field/i)).toHaveValue(formDefaultValue.cep);
    expect(screen.getByLabelText(/avatar field/i)).not.toHaveAttribute('src');
  });

  it('should insert placehold image in avatar when not have avatar url', () => {
    const firstLetterOfName = formDefaultValue.full_name.at(0).toUpperCase();
    render(<UpdateProfileModelForm {...formDefaultValue} />, { wrapper });

    fireEvent.error(screen.getByRole('img', { name: /avatar profile image/i }));

    expect(screen.getByRole('img', { name: /avatar profile image/i })).toHaveAttribute(
      'src',
      `https://placehold.co/250x250/f4f4f5/09090b?text=${firstLetterOfName}`,
    );
  });

  it('should get image in the file input and show in avatar component', async () => {
    render(<UpdateProfileModelForm {...formDefaultValue} />, { wrapper });

    await userEvents.upload(screen.getByLabelText(/avatar field/i), avatarImage.file);

    expect(await screen.findByLabelText(/avatar field/i)).toHaveValue(avatarImage.path);
    expect(await screen.findByRole('img', { name: /avatar profile image/i })).toHaveAttribute(
      'src',
      avatarImage.url,
    );
  });

  it('should update values field fields and submitted form', async () => {
    axiosFetch.onPatch(updateAccountRoute).reply(200);
    render(<UpdateProfileModelForm {...formDefaultValue} />, { wrapper });

    const newFormValue = {
      name: 'GHome games',
      cep: '55768-000',
    };

    await userEvents.upload(screen.getByLabelText(/avatar field/i), avatarImage.file);
    await userEvents.clear(await screen.findByLabelText(/full name field/i));
    await userEvents.type(screen.getByLabelText(/full name field/i), newFormValue.name);
    await userEvents.clear(await screen.findByLabelText(/cep field/i));
    await userEvents.type(screen.getByLabelText(/cep field/i), newFormValue.cep);

    expect(await screen.findByLabelText(/avatar field/i)).toHaveValue(avatarImage.path);
    expect(await screen.findByLabelText(/full name field/i)).toHaveValue(newFormValue.name);
    expect(await screen.findByLabelText(/cep field/i)).toHaveValue(newFormValue.cep);

    await userEvents.click(await screen.findByRole('button', { name: /Confirmar/i }));

    expect(axiosFetch.history[0].url).toBe(updateAccountRoute);
    const formData = axiosFetch.history[0].data as FormData;
    expect(formData.get('avatar')).toBeInstanceOf(File);
    expect(formData.get('name')).toBe(newFormValue.name);
    expect(formData.get('cep')).toBe(newFormValue.cep);
  });

  it('should accept submitted when update another values fields without add new image', async () => {
    axiosFetch.onPatch(updateAccountRoute).reply(200);
    render(<UpdateProfileModelForm {...formDefaultValue} />, { wrapper });

    expect(await screen.findByLabelText(/avatar field/i)).not.toHaveValue();

    await userEvents.click(await screen.findByRole('button', { name: /Confirmar/i }));

    expect(axiosFetch.history[0].url).toBe(updateAccountRoute);
    const formData = axiosFetch.history[0].data as FormData;
    expect(formData.get('name')).toBe(formDefaultValue.full_name);
    expect(formData.get('cep')).toBe(formDefaultValue.cep);
    expect(formData.get('avatar')).toBeNull();
  });

  it('should not accept submitted when update avatar field great than 5MB', async () => {
    axiosFetch.onPatch(updateAccountRoute).reply(200);
    render(<UpdateProfileModelForm {...formDefaultValue} />, { wrapper });

    const targetSizeBytes = 10 * 1024 * 1024;
    const fillerCharacter = 'A';
    const repetitions = Math.ceil(targetSizeBytes / 2);
    const largeContentString = fillerCharacter.repeat(repetitions);
    const bigAvatarImage = new File([largeContentString], 'avatar.png', { type: 'image/png' });
    await userEvents.upload(screen.getByLabelText(/avatar field/i), bigAvatarImage);
    await userEvents.click(await screen.findByRole('button', { name: /Confirmar/i }));

    expect(axiosFetch.history[0]).toBeUndefined();
  });
});
