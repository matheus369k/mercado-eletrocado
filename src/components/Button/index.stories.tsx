import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, type ButtonProps } from '.';

const MetaButton: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  decorators: [(Story) => <div style={{ width: '300px' }}>{Story()}</div>],
  argTypes: {
    btnType: { control: 'inline-radio' },
    customClass: { control: 'select', options: ['none', 'btn_form'] },
  },
  parameters: { layout: 'centered' },
  args: { children: 'Confirmar', btnType: 'default' },
  tags: ['autodocs'],
};

export default MetaButton;

export const Default: StoryObj<ButtonProps> = {};

export const Outline: StoryObj<ButtonProps> = {
  args: {
    btnType: 'outline',
  },
};
