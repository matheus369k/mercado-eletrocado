import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoDisplay } from '.';

const MetaLogo: Meta<typeof LogoDisplay> = {
  title: 'Components/Logo',
  component: LogoDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: { customClass: 'footer_logo' },
  argTypes: { customClass: { control: 'select', options: ['footer_logo', 'none'] } },
};

export default MetaLogo;

export const Default: StoryObj<typeof LogoDisplay> = {};
