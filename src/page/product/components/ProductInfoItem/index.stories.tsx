import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductInfoItem } from '.';

const MetaProductInfoItem: Meta<typeof ProductInfoItem> = {
  title: 'Pages/Product/Components/ProductInfoItem',
  component: ProductInfoItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: { info: 'description of product is write here', label: 'label' },
};

export default MetaProductInfoItem;

export const Default: StoryObj<typeof ProductInfoItem> = {};
