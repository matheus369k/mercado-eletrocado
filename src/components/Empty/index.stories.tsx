import type { Meta, StoryObj } from '@storybook/react-vite';
import { Empty, type EmptyProps } from '.';

const MetaEmpty: Meta<EmptyProps> = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
  args: { message: 'Not Found Profile Page...' },
  parameters: {
    layout: 'centered',
  },
};

export default MetaEmpty;

export const Default: StoryObj<EmptyProps> = {};
