/* eslint-disable indent */
import { ProductCard, CategoryFilter } from './components';
import type { ProductType } from '@/@types/product';
import { CATEGORY_PRODUCTS_TYPES } from '@/util/const';
import Carousel from 'react-multi-carousel';
import styles from './index.module.css';
import { TitleContent, TitleRoot } from '@/components';
import { MultiCarouselHorizonResponsive } from '@/lib/mult-carousel';
import { useProducts } from './hook/use-products';
import { useEffect, useRef, useState, type ComponentRef } from 'react';

export const Home = () => {
  const pageRef = useRef<ComponentRef<'section'> | null>(null);
  const [showArrow, setShowArrow] = useState(true);
  const { stateProduct, handleUpdateProducts } = useProducts();
  const ContentTitle =
    stateProduct.category === 'all' ? 'Produtos' : CATEGORY_PRODUCTS_TYPES[stateProduct.category];

  const hiddenCarouselArrows = () => {
    setTimeout(() => {
      const isNotMobileMode = pageRef.current.clientWidth > 768;
      setShowArrow(isNotMobileMode);
    });
  };

  useEffect(() => {
    window.addEventListener('resize', hiddenCarouselArrows);
    hiddenCarouselArrows();

    return () => {
      window.removeEventListener('resize', hiddenCarouselArrows);
    };
  }, []);

  return (
    <section ref={pageRef} className={styles.home_container}>
      <TitleRoot>
        <TitleContent>{ContentTitle}</TitleContent>
        <CategoryFilter
          filter={stateProduct.category}
          handleUpdateProducts={handleUpdateProducts}
        />
      </TitleRoot>

      {stateProduct.category !== 'all' && (
        <div className={styles.products_category_loader_container}>
          {(stateProduct.products as ProductType[]).length > 0
            ? (stateProduct.products as ProductType[]).map((product) => {
                return <ProductCard key={product._id} {...product} />;
              })
            : Array.from({ length: 8 }).map((_, index) => {
                return <div key={index + '_id'} className={styles.loader_card} />;
              })}
        </div>
      )}

      {stateProduct.category === 'all' &&
        (Object.keys(stateProduct.products).length ? (
          <>
            {Object.entries(stateProduct.products).map(([key, productsEntries]) => {
              return (
                <div key={key} className={styles.products_category_container}>
                  <h3 className={styles.product_title}>{CATEGORY_PRODUCTS_TYPES[key]}</h3>
                  {productsEntries && (
                    <Carousel
                      className={styles.carousel_container}
                      responsive={MultiCarouselHorizonResponsive}
                      arrows={showArrow}>
                      {(productsEntries as ProductType[]).map((product) => {
                        return <ProductCard key={product._id} {...product} />;
                      })}
                    </Carousel>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          Array.from({ length: 3 }).map((_, index) => {
            return (
              <div key={index + '_category'} className={styles.products_category_container}>
                <h3 className={styles.product_loader_title}>loading carrousel...</h3>
                <Carousel
                  className={styles.carousel_container}
                  arrows={false}
                  responsive={MultiCarouselHorizonResponsive}
                  ssr={true}>
                  {Array.from({ length: 8 }).map((_, index) => {
                    return <div key={index + '_id'} className={styles.loader_card} />;
                  })}
                </Carousel>
              </div>
            );
          })
        ))}
    </section>
  );
};
