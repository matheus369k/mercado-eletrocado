import type { Meta, StoryObj } from '@storybook/react-vite';
import { TitleContent, TitleRoot, type TitleContentProps, type TitleRootProps } from '.';

const MetaTitle: Meta<TitleContentProps> = {
  title: 'Components/Title',
  component: TitleContent,
  decorators: (Story) => <TitleRoot>{Story()}</TitleRoot>,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: { children: 'Story Title' },
};

export default MetaTitle;

export const Default: StoryObj<TitleContentProps> = {};
