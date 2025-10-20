import { ResponsiveType } from 'react-multi-carousel';

export const MultiCarouselHorizonResponsive: ResponsiveType = {
  desktop: {
    breakpoint: { min: 1024, max: 3000 },
    partialVisibilityGutter: 0,
    items: 4,
  },
  tablet: {
    breakpoint: { min: 768, max: 1023 },
    partialVisibilityGutter: 10,
    items: 3,
  },
  mobile_lg: {
    breakpoint: { min: 549, max: 767 },
    partialVisibilityGutter: 50,
    items: 2,
  },
  mobile: {
    breakpoint: { min: 400, max: 548 },
    partialVisibilityGutter: 30,
    items: 2,
  },
  mobile_sm: {
    breakpoint: { min: 300, max: 399 },
    partialVisibilityGutter: 10,
    items: 2,
  },
};
