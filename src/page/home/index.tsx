/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { fetchProducts } from '@/lib/axios';
import { ProductCard, CategoryFilter } from './components';
import { useEffect, useReducer } from 'react';
import type { CategoryProductsType, ProductType } from '@/@types/product';
import { CATEGORY_PRODUCTS_TYPES } from '@/util/const';
import Carousel from 'react-multi-carousel';
import styles from './index.module.css';
import {
  initialReducerState,
  productCategoryUpdate,
  productUpdate,
  reducer,
} from './reducer/products';
import { searchParams } from '@/util/search-params';
import { TitleContent, TitleRoot } from '@/components';
import { MultiCarouselHorizonResponsive } from '@/lib/mult-carousel';

export type CategoryTypes = 'notebook' | 'tablet' | 'phone' | 'all';

export interface ReducerStateType {
  category?: CategoryTypes;
  products: CategoryProductsType | ProductType[];
}

export const Home = () => {
  const [stateProduct, dispatch] = useReducer(
    reducer,
    {
      category: 'all',
      products: [],
    } as ReducerStateType,
    initialReducerState,
  );

  const fetchingProductsDatas = async () => {
    try {
      const response = await fetchProducts.get('products');
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateProducts = async (filter: CategoryTypes) => {
    searchParams.addSearchParam({
      key: 'filter',
      value: filter,
    });

    const data = await fetchingProductsDatas();

    if (filter === 'all') {
      dispatch(
        productUpdate({
          products: data as CategoryProductsType,
        }),
      );
      return;
    }
    dispatch(
      productCategoryUpdate({
        products: data[filter] as ProductType[],
        category: filter,
      }),
    );
  };

  useEffect(() => {
    handleUpdateProducts(stateProduct.category);
  }, []);

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
          {stateProduct.products
            ? (stateProduct.products as ProductType[]).map((product) => {
                return <ProductCard key={product.id} {...product} />;
              })
            : Array.from({ length: 8 }).map((_, index) => {
                return (
                  <div key={index + '_id'} className={styles.home__product_category__loader_card} />
                );
              })}
        </div>
      )}

      {stateProduct.category === 'all' &&
        (stateProduct.products ? (
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
                        return <ProductCard key={product.id} {...product} />;
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
