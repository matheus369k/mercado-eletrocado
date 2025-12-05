import type { Meta, StoryObj } from '@storybook/react-vite';
import { PriceStockInfo, type PriceStockInfoProps } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';

const MetaPriceStockInfo: Meta<PriceStockInfoProps> = {
  title: 'Components/PriceStockInfo',
  component: PriceStockInfo,
  tags: ['autodocs'],
  args: {
    _id: faker.database.mongodbObjectId(),
    price: faker.number.int({ min: 145099, max: 385600 }),
    customClass: 'none',
  },
  argTypes: {
    customClass: {
      control: 'select',
      options: [
        'none',
        'product_selected',
        'product_checkout',
        'product_user',
        'product_store_cart',
      ],
    },
  },
  parameters: { layout: 'centered' },
};

export default MetaPriceStockInfo;

export const Default: StoryObj<PriceStockInfoProps> = {
  decorators: (Story) => <div style={{ maxWidth: '249px' }}>{Story()}</div>,
};

export const OnlyPrice: StoryObj<PriceStockInfoProps> = {
  decorators: (Story) => <div style={{ maxWidth: '249px' }}>{Story()}</div>,
  args: {
    customClass: 'product_checkout',
  },
};

export const LargeLayout: StoryObj<PriceStockInfoProps> = {
  decorators: (Story) => <div style={{ maxWidth: '549px', width: '100%' }}>{Story()}</div>,
  args: {
    customClass: 'product_selected',
  },
};
