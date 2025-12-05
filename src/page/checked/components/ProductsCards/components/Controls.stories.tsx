import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controls } from './Controls';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderSetting } from '..';

const MetaControls: Meta<typeof Controls> = {
  title: 'Pages/Checked/Components/ProductsCards/Components',
  component: Controls,
  tags: ['autodocs'],
  decorators: (Story) => (
    <Swiper
      allowTouchMove={false}
      allowSlidePrev={false}
      allowSlideNext={false}
      height={144}
      spaceBetween={16}
      {...SliderSetting}>
      {Story()}
      {Array.from({ length: 6 }).map(() => (
        <SwiperSlide
          style={{
            width: '449px',
            backgroundColor: 'var(--zinc-300)',
          }}
        />
      ))}
    </Swiper>
  ),
  parameters: { layout: 'centered' },
};

export default MetaControls;

export const Default: StoryObj<typeof Controls> = {};
