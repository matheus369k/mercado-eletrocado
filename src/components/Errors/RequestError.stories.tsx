import type { Meta, StoryObj } from '@storybook/react-vite';
import { RequestError } from './RequestError';
import type { ReactNode } from 'react';

const MetaRequestError: Meta<typeof RequestError> = {
  title: 'Components/Errors/RequestError',
  component: RequestError,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default MetaRequestError;

export const Default: StoryObj<typeof RequestError> = {};
