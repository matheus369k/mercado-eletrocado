import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, type AvatarProps } from '.';
import { env } from '@/env';

const MetaAvatar: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
  decorators: (Story) => {
    env.VITE_DATABASE_URL = 'https://picsum.photos';

    return Story();
  },
  args: { name: 'Matheus' },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default MetaAvatar;

export const FirstLetter: StoryObj<AvatarProps> = {};

export const MainAvatar: StoryObj<AvatarProps> = {
  args: { avatarUrl: '250/250' },
};

export const PreviewAvatar: StoryObj<AvatarProps> = {
  args: { previewUrl: 'https://picsum.photos/250/250' },
};
