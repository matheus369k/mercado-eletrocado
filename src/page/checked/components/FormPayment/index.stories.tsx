import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormPayment } from '.';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Route, Routes } from 'react-router-dom';

const MetaFormPayment: Meta<typeof FormPayment> = {
  title: 'Pages/Checked/Components/FormPayment',
  component: FormPayment,
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
};

export default MetaFormPayment;

export const Default: StoryObj<typeof FormPayment> = {};
