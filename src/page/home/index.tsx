/* eslint-disable indent */
import { ProductCard, CategoryFilter } from './components';
import type { ProductType } from '@/@types/product';
import { CATEGORY_PRODUCTS_TYPES } from '@/util/const';
import Carousel from 'react-multi-carousel';
import styles from './index.module.css';
import { TitleContent, TitleRoot } from '@/components';
import { MultiCarouselHorizonResponsive } from '@/lib/mult-carousel';
import { useProductsCategories } from './hook/use-products';
import { useProducts } from './http/use-products';

export const Home = () => {
  const { category, handleUpdateFilter } = useProductsCategories();
  const ContentTitle = category === 'all' ? 'Produtos' : CATEGORY_PRODUCTS_TYPES[category];
  const { data: products, isFetched, isFetching } = useProducts(category);

  const showingAllProducts = category === 'all' && isFetched;
  const showingLoaderAllProducts = category === 'all' && isFetching;
  const showingCategoryProducts = category !== 'all' && isFetched;
  const showingLoaderCategoryProducts = category !== 'all' && isFetching;
  return (
    <section className={styles.home_container}>
      <TitleRoot>
        <TitleContent>{ContentTitle}</TitleContent>
        <CategoryFilter filter={category} handleUpdateFilter={handleUpdateFilter} />
      </TitleRoot>

      {showingCategoryProducts && (
        <div aria-label="only category container" className={styles.products_category_container}>
          {(products as ProductType[]).map((product) => {
            return <ProductCard key={product._id} {...product} />;
          })}
        </div>
      )}

      {showingLoaderCategoryProducts && (
        <div
          aria-label="loading only category container"
          className={styles.products_category_container}>
          {Array.from({ length: 8 }).map((_, index) => {
            return <div key={index + '_id'} className={styles.loader_card} />;
          })}
        </div>
      )}

      {showingAllProducts &&
        Object.entries(products).map(([key, productsEntries]) => {
          return (
            <div
              aria-label="all category container"
              key={key}
              className={styles.products_category_all_container}>
              <h3 className={styles.product_title}>{CATEGORY_PRODUCTS_TYPES[key]}</h3>
              {productsEntries && (
                <Carousel
                  swipeable
                  draggable
                  minimumTouchDrag={10}
                  transitionDuration={280}
                  customTransition="transform 280ms cubic-bezier(.17,.67,.36,1)"
                  className={styles.carousel_container}
                  responsive={MultiCarouselHorizonResponsive}
                  removeArrowOnDeviceType={['tablet', 'mobile_sm', 'mobile_lg', 'mobile']}
                  partialVisible>
                  {(productsEntries as ProductType[]).map((product) => {
                    return <ProductCard key={product._id} {...product} />;
                  })}
                </Carousel>
              )}
            </div>
          );
        })}

      {showingLoaderAllProducts &&
        Array.from({ length: 3 }).map((_, index) => {
          return (
            <div
              aria-label="loading all category container"
              key={index + '_category'}
              className={styles.products_category_loader_container}>
              <h3 className={styles.product_loader_title}>loading carrousel...</h3>
              <Carousel
                className={styles.carousel_container}
                partialVisible
                arrows={false}
                responsive={MultiCarouselHorizonResponsive}>
                {Array.from({ length: 8 }).map((_, index) => {
                  return <div key={index + '_id'} className={styles.loader_card} />;
                })}
              </Carousel>
            </div>
          );
        })}
    </section>
  );
};
