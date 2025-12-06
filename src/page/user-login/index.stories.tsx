import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserLogin } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { delay, http, HttpResponse } from 'msw';
import { env } from '@/env';

const MetaUserLogin: Meta<typeof UserLogin> = {
  title: 'Pages/UserLogin',
  component: UserLogin,
  tags: ['autodocs'],
  decorators: (Story) => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="*" element={Story()} />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        http.post(`${env.VITE_DATABASE_URL}/api/users/login`, () => {
          return delay(3000);
        }),
      ],
    },
  },
};

export default MetaUserLogin;

export const Default: StoryObj<typeof UserLogin> = {};
