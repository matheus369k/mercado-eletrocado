import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorBoundary } from './ErrorBoundary';
import type { ReactNode } from 'react';

const MetaErrorBoundary: Meta<typeof ErrorBoundary> = {
  title: 'Components/Errors/ErrorsBoundary',
  component: ErrorBoundary,
  args: { children: {} as ReactNode },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default MetaErrorBoundary;

export const Default: StoryObj<typeof ErrorBoundary> = {};
