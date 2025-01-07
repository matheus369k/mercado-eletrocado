import Slider from 'react-slick';
import { useRef } from 'react';

export const useSlide = () => {
  const sliderRef = useRef<Slider | null>(null);

  const handleNextSlider = () => {
    sliderRef.current.slickNext();
    console.log(sliderRef.current);
  };

  const handlePreviousSlider = () => {
    sliderRef.current.slickPrev();
    console.log(sliderRef.current);
  };

  const handleSetSlider = (sliderPops: Slider | null) => {
    if (!sliderPops) return;

    sliderRef.current = sliderPops;
  };

  return {
    handleNextSlider,
    handlePreviousSlider,
    handleSetSlider,
  };
};
