import type { Meta, StoryObj } from '@storybook/react-vite';
import { Layout } from './layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/cart/slice';
import { http, HttpResponse } from 'msw';
import { env } from '@/env';
import { faker } from '@faker-js/faker/locale/pt_BR';

const routes = createBrowserRouter([
  {
    path: '*',
    element: <Layout />,
    children: [
      {
        path: '*',
        Component: () => {
          return (
            <div style={{ textAlign: 'center' }}>
              <h1>Storybook Page</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit repellendus
                magnam sint nulla omnis tenetur, voluptatibus, repellat nostrum non, molestiae
                deserunt cumque dolores dignissimos debitis architecto corrupti unde quidem.
                Numquam.
              </p>
            </div>
          );
        },
      },
    ],
  },
]);

const MetaLayout: Meta<typeof Layout> = {
  title: 'Root/Layout',
  component: Layout,
  tags: ['autotags'],
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Provider
          store={configureStore({
            reducer: {
              cart: cartReducer,
            },
          })}>
          <RouterProvider router={routes} />
        </Provider>
      </QueryClientProvider>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default MetaLayout;

export const Logout: StoryObj<typeof Layout> = {};
export const Logged: StoryObj<typeof Layout> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/users/profile`, () => {
          return HttpResponse.json(
            {
              cep: faker.location.zipCode(),
              name: faker.person.fullName(),
              avatar: null,
              email: faker.internet.email(),
              id: faker.database.mongodbObjectId(),
            },
            { status: 200 },
          );
        }),
      ],
    },
  },
};
