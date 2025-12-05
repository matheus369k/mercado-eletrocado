import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { env } from '@/env';
import { http, HttpResponse } from 'msw';

const MetaNavbar: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <HashRouter>
            <Routes>
              <Route
                path="*"
                element={
                  <div
                    style={{
                      backgroundColor: '#000',
                    }}>
                    <div
                      style={{
                        width: 'fit-content',
                        marginLeft: 'auto',
                        padding: '1.6rem 1rem',
                      }}>
                      {Story()}
                    </div>
                  </div>
                }
              />
            </Routes>
          </HashRouter>
        </Provider>
      </QueryClientProvider>
    );
  },
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default MetaNavbar;

export const Default: StoryObj<typeof Navbar> = {};

export const UserLogged: StoryObj<typeof Navbar> = {
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
