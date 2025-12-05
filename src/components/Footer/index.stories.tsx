import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from '.';

const MetaFooter: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (Story) => {
    return <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>{Story()}</div>;
  },
};

export default MetaFooter;

export const Default: StoryObj<typeof Footer> = {};
