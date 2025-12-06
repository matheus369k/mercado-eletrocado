import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { env } from '@/env';
import { http, HttpResponse } from 'msw';
import { faker } from '@faker-js/faker/locale/pt_BR';
const categories = ['tablet', 'notebook', 'phone', 'all'];
const productsCategories = Array.from({ length: 15 }).map((_, index) => {
  if ((index + 1) % 3 === 0) {
    return categories[0];
  }
  if ((index + 1) % 2 === 0) {
    return categories[1];
  }
  return categories[2];
});
const onlyCategoryProducts = Array.from({ length: 15 }).map((_, index) => ({
  _id: faker.database.mongodbObjectId(),
  price: faker.number.int({ min: 156899, max: 347499 }),
  model: faker.commerce.productName(),
  img: faker.image.url({ width: 250, height: 250 }),
  slide: {
    slide1: faker.image.url({ width: 250, height: 250 }),
    slide2: faker.image.url({ width: 250, height: 250 }),
    slide3: faker.image.url({ width: 250, height: 250 }),
  },
  screen: faker.commerce.productMaterial(),
  processor: faker.commerce.productMaterial(),
  memory: faker.commerce.productMaterial(),
  placeVideo: faker.commerce.productMaterial(),
  battery: faker.commerce.productMaterial(),
  category: productsCategories[index],
}));
const allCategoriesProducts = onlyCategoryProducts.reduce((acc, curr) => {
  if (acc[curr.category]) {
    {
      acc[curr.category].push(curr);
    }
  } else {
    return {
      [curr.category]: [curr],
      ...(acc || []),
    };
  }
  return acc;
}, {});

const handlers = categories.map((category) => {
  if (category === 'all') {
    return http.get(`${env.VITE_DATABASE_URL}/api/products`, () => {
      return HttpResponse.json(allCategoriesProducts);
    });
  }

  return http.get(`${env.VITE_DATABASE_URL}/api/products/${category}`, () => {
    return HttpResponse.json(
      onlyCategoryProducts.filter((product) => product.category === category),
    );
  });
});

const MetaHome: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
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
      handlers,
    },
  },
};

export default MetaHome;

export const Default: StoryObj<typeof Home> = {
  beforeEach: () => {
    const newUrl = new URL(window.location.toString());
    newUrl.searchParams.set('filter', 'all');
    window.history.pushState({}, '', newUrl);
  },
  afterEach: () => {
    const newUrl = new URL(window.location.toString());
    newUrl.searchParams.delete('filter');
    window.history.pushState({}, '', newUrl);
  },
};

export const WithFilterCategory: StoryObj<typeof Home> = {
  beforeEach: () => {
    const newUrl = new URL(window.location.toString());
    newUrl.searchParams.set('filter', 'notebook');
    window.history.pushState({}, '', newUrl);
  },
  afterEach: () => {
    const newUrl = new URL(window.location.toString());
    newUrl.searchParams.delete('filter');
    window.history.pushState({}, '', newUrl);
  },
};
