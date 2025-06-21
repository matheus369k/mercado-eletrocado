/* eslint-disable indent */
import { ProductCard, CategoryFilter } from './components';
import type { ProductType } from '@/@types/product';
import { CATEGORY_PRODUCTS_TYPES } from '@/util/const';
import Carousel from 'react-multi-carousel';
import styles from './index.module.css';
import { TitleContent, TitleRoot } from '@/components';
import { MultiCarouselHorizonResponsive } from '@/lib/mult-carousel';
import { useProducts } from './hook/use-products';

export const Home = () => {
  const { stateProduct, handleUpdateProducts } = useProducts();
  const ContentTitle =
    stateProduct.category === 'all' ? 'Produtos' : CATEGORY_PRODUCTS_TYPES[stateProduct.category];

  return (
    <section className={styles.home_container}>
      <TitleRoot>
        <TitleContent>{ContentTitle}</TitleContent>
        <CategoryFilter
          filter={stateProduct.category}
          handleUpdateProducts={handleUpdateProducts}
        />
      </TitleRoot>

      {stateProduct.category !== 'all' && (
        <div className={styles.home__products_category_container}>
          {(stateProduct.products as ProductType[]).length > 0
            ? (stateProduct.products as ProductType[]).map((product) => {
                return <ProductCard key={product._id} {...product} />;
              })
            : Array.from({ length: 8 }).map((_, index) => {
                return (
                  <div key={index + '_id'} className={styles.home__product_category__loader_card} />
                );
              })}
        </div>
      )}

      {stateProduct.category === 'all' &&
        (Object.keys(stateProduct.products).length ? (
          <>
            {Object.entries(stateProduct.products).map(([key, productsEntries]) => {
              return (
                <div key={key} className={styles.home__products_main_container}>
                  <h3 className={styles.home__products__category_title}>
                    {CATEGORY_PRODUCTS_TYPES[key]}
                  </h3>
                  {productsEntries && (
                    <Carousel
                      className={styles.home__carousel_container}
                      responsive={MultiCarouselHorizonResponsive}
                      ssr={true}>
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
              <div key={index + '_category'} className={styles.home__products_main_container}>
                <h3 className={styles.home__products__loader_category_title}>
                  loading carrousel...
                </h3>
                <Carousel
                  className={styles.home__carousel_container}
                  arrows={false}
                  responsive={MultiCarouselHorizonResponsive}
                  ssr={true}>
                  {Array.from({ length: 8 }).map((_, index) => {
                    return (
                      <div key={index + '_id'} className={styles.home__products__loader_card} />
                    );
                  })}
                </Carousel>
              </div>
            );
          })
        ))}
    </section>
  );
};
