import type { Meta, StoryObj } from '@storybook/react-vite';
import { Title } from '.';

const MetaTitle: Meta<typeof Title> = {
  title: 'Pages/Checked/Components/Title',
  component: Title,
  tags: ['autodocs'],
  args: { children: 'Storybook' },
};

export default MetaTitle;

export const Default: StoryObj<typeof Title> = {};
