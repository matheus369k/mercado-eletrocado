import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorRoute } from './ErrorRoute';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ROUTES_PATHNAMES } from '@/util/const';

const MetaErrorRoute: Meta<typeof ErrorRoute> = {
  title: 'Components/Errors/ErrorRoute',
  component: ErrorRoute,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: (Story) => {
    ROUTES_PATHNAMES.HOME = '';

    return (
      <HashRouter>
        <Routes>
          <Route path="*" element={Story()} />
        </Routes>
      </HashRouter>
    );
  },
};

export default MetaErrorRoute;

export const Default: StoryObj<typeof ErrorRoute> = {};
