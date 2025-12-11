import type { Meta, StoryObj } from '@storybook/react-vite';
import { UpdateProfileModelForm, UpdateProfileModelFormProps } from '.';
import { DropdownModelRoot } from '@/components';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { env } from '@/env';
import { delay, http } from 'msw';

const VITE_DATABASE_URL = env.VITE_DATABASE_URL;

const MetaUpdateProfileModelForm: Meta<UpdateProfileModelFormProps> = {
  title: 'Pages/UserProfile/Components/UpdateProfileModel',
  component: UpdateProfileModelForm,
  tags: ['autodocs'],
  afterEach: () => {
    document.getElementById('updateProfile')?.setAttribute('data-open', 'true');
  },
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route
              path="*"
              element={
                <DropdownModelRoot mode="model" referenceId="updateProfile">
                  {Story()}
                </DropdownModelRoot>
              }
            />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    );
  },
  args: {
    cep: faker.location.zipCode(),
    full_name: faker.person.fullName(),
  },
  parameters: {
    msw: {
      handlers: [
        http.patch(`${VITE_DATABASE_URL}/api/users/update`, () => {
          return delay(3000);
        }),
      ],
    },
  },
};

export default MetaUpdateProfileModelForm;

export const Default: StoryObj<UpdateProfileModelFormProps> = {
  beforeEach: () => {
    env.VITE_DATABASE_URL = 'https://picsum.photos';
  },
  args: {
    avatarUrl: '250/250',
  },
};
export const WithoutCustomImage: StoryObj<UpdateProfileModelFormProps> = {
  beforeEach: () => {
    env.VITE_DATABASE_URL = '';
  },
  args: {
    avatarUrl: 'null',
  },
};
