import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from '.';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { env } from '@/env';
import { faker } from '@faker-js/faker/locale/pt_BR';

const MetaHeader: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: (Story) => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <HashRouter>
            <Routes>
              <Route path="*" element={Story()} />
            </Routes>
          </HashRouter>
        </Provider>
      </QueryClientProvider>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default MetaHeader;

export const Default: StoryObj<typeof Header> = {};

export const UserLogged: StoryObj<typeof Header> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/users/profile`, () => {
          return HttpResponse.json({
            avatar: faker.image.avatar(),
            email: faker.internet.email(),
            name: faker.person.fullName(),
            cep: faker.location.zipCode(),
            id: faker.database.mongodbObjectId(),
          });
        }),
      ],
    },
  },
};
