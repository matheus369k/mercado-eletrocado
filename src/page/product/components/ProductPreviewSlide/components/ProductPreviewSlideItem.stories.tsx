import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProductSlideItemImage,
  ProductSlideItemRoot,
  type ProductSlideItemImageProps,
} from './ProductPreviewSlideItem';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { fn } from 'storybook/test';

const props = {
  mainImage: faker.image.url({ width: 250, height: 250 }),
  slidePreview: faker.image.url({ width: 250, height: 250 }),
};

const MetaProductPreviewSlideItem: Meta<ProductSlideItemImageProps> = {
  title: 'Pages/Product/Components/ProductPreviewSlideItem/Components',
  component: ProductSlideItemImage,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: (Story) => (
    <ProductSlideItemRoot {...props} handleClick={fn()}>
      {Story()}
    </ProductSlideItemRoot>
  ),
  args: { model: faker.commerce.productName(), slidePreview: props.slidePreview },
};

export default MetaProductPreviewSlideItem;

export const Default: StoryObj<ProductSlideItemImageProps> = {};
