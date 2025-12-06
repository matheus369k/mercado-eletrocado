import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductPreviewSlide } from '.';
import { faker } from '@faker-js/faker/locale/pt_BR';

const mainImage = faker.image.url({ width: 250, height: 250 });
const props = {
  img: mainImage,
  slide: {
    slide1: mainImage,
    slide2: faker.image.url({ width: 250, height: 250 }),
    slide3: faker.image.url({ width: 250, height: 250 }),
  },
  model: faker.commerce.productName(),
};

const MetaProductPreviewSlide: Meta<typeof ProductPreviewSlide> = {
  title: 'Pages/Product/Components/ProductPreviewSlide',
  component: ProductPreviewSlide,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { ...props },
};

export default MetaProductPreviewSlide;

export const Default: StoryObj<typeof ProductPreviewSlide> = {};
