import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserProfile } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { delay, http, HttpResponse } from 'msw';
import { env } from '@/env';
import { faker } from '@faker-js/faker/locale/pt_BR';

const generateProductsDatas = Array.from({ length: 5 }).map(() => ({
  productId: faker.database.mongodbObjectId(),
  image: faker.image.url({ width: 250, height: 250 }),
  name: faker.commerce.productName(),
  price: faker.number.int({ min: 156899, max: 347299 }),
  id: faker.database.mongodbObjectId(),
}));
const userDatas = {
  cep: faker.location.zipCode(),
  name: faker.person.fullName(),
  avatar: '250/250',
  email: faker.internet.email(),
  id: faker.database.mongodbObjectId(),
};

const MetaUserProfile: Meta<typeof UserProfile> = {
  title: 'Pages/UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
  decorators: (Story) => {
    env.VITE_DATABASE_URL = 'https://picsum.photos';
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0, staleTime: 0 } },
    });

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
};

export default MetaUserProfile;

export const Default: StoryObj<typeof UserProfile> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/users/profile`, () => {
          return HttpResponse.json(userDatas, { status: 200 });
        }),
        http.get(`${env.VITE_DATABASE_URL}/api/products/favorite`, () => {
          const favoriteProducts = generateProductsDatas.map((product) => ({
            ...product,
            createAt: faker.date.past().toISOString(),
          }));
          return HttpResponse.json(favoriteProducts, { status: 200 });
        }),
        http.get(`${env.VITE_DATABASE_URL}/api/products/delivery`, () => {
          const deliveryProducts = generateProductsDatas.map((product) => ({
            ...product,
            deliveryDate: faker.date.past().toISOString(),
          }));
          return HttpResponse.json(deliveryProducts, { status: 200 });
        }),
      ],
    },
  },
};

export const Loading: StoryObj<typeof UserProfile> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/users/profile`, () => {
          return delay('infinite');
        }),
        http.get(`${env.VITE_DATABASE_URL}/api/products/favorite`, () => {
          return delay('infinite');
        }),
        http.get(`${env.VITE_DATABASE_URL}/api/products/delivery`, () => {
          return delay('infinite');
        }),
      ],
    },
  },
};

export const Empty: StoryObj<typeof UserProfile> = {
  parameters: {
    msw: {
      handlers: [
        http.get(`${env.VITE_DATABASE_URL}/api/users/profile`, () => {
          return HttpResponse.json(userDatas, { status: 200 });
        }),
        http.get(`${env.VITE_DATABASE_URL}/api/products/favorite`, () => {
          return HttpResponse.json([], { status: 200 });
        }),
        http.get(`${env.VITE_DATABASE_URL}/api/products/delivery`, () => {
          return HttpResponse.json([], { status: 200 });
        }),
      ],
    },
  },
};
