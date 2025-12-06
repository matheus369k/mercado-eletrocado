import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryFilter, type CategoryFilterProps } from '.';
import { HashRouter, Route, Routes } from 'react-router-dom';

const MetaCategoryFilter: Meta<CategoryFilterProps> = {
  title: 'Pages/Home/Components/CategoryFilter',
  component: CategoryFilter,
  decorators: (Story) => (
    <HashRouter>
      <Routes>
        <Route
          path="*"
          element={<div style={{ display: 'flex', justifyContent: 'right' }}>{Story()}</div>}
        />
      </Routes>
    </HashRouter>
  ),
  tags: ['autodocs'],
  args: { filter: 'all' },
  argTypes: { filter: { control: 'select' } },
};

export default MetaCategoryFilter;

export const Default: StoryObj<CategoryFilterProps> = {};
