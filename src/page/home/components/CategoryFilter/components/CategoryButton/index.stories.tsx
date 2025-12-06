import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryButton, type CategoryButtonProps } from '.';

const MetaCategoryButton: Meta<CategoryButtonProps> = {
  title: 'Pages/Home/Components/CategoryButton/Components/CategoryButton',
  component: CategoryButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: { children: 'Notebook', category: 'notebook', filter: 'all' },
  argTypes: { filter: { control: 'select' }, category: { control: 'select' } },
};

export default MetaCategoryButton;

export const Default: StoryObj<CategoryButtonProps> = {};

export const Active: StoryObj<CategoryButtonProps> = {
  args: { filter: 'notebook' },
};
