/* eslint-disable react-hooks/exhaustive-deps */
import { useSwiper } from 'swiper/react';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { SlArrowUp } from 'react-icons/sl';

export const Controls = () => {
  const swiper = useSwiper();
  const [isSlide, setSlide] = useState({
    first: true,
    last: false,
  });

  const handleNextSlide = () => {
    swiper.slideNext();
    setSlide({
      first: swiper.isBeginning,
      last: swiper.isEnd,
    });
  };
  const handlePrevSlide = () => {
    swiper.slidePrev();
    setSlide({
      first: swiper.isBeginning,
      last: swiper.isEnd,
    });
  };

  useEffect(() => {
    if (swiper.isLocked) {
      setSlide({
        first: swiper.isBeginning,
        last: swiper.isEnd,
      });
    }
  }, []);

  return (
    <div className={styles.checkout__products_cards__controls_container}>
      <button
        disabled={isSlide.first}
        type="button"
        className="swiper-slide-prev"
        onClick={handlePrevSlide}>
        <SlArrowUp />
      </button>
      <button
        disabled={isSlide.last}
        className="swiper-slide-next"
        onClick={handleNextSlide}
        type="button">
        <SlArrowDown />
      </button>
    </div>
  );
};
