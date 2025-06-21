/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from 'react';
import {
  initialReducerState,
  productCategoryUpdate,
  productUpdate,
  reducer,
} from '../reducer/products';
import { searchParams } from '@/util/search-params';
import { getAllProducts, getProductsOfCategory } from '../service/product';
import type { CategoryProductsType, ProductType } from '@/@types/product';

export type CategoryTypes = 'notebook' | 'tablet' | 'phone' | 'all';

export interface ReducerStateType {
  category?: CategoryTypes;
  products: CategoryProductsType | ProductType[];
}

export const useProducts = () => {
  const [stateProduct, dispatch] = useReducer(
    reducer,
    {
      category: 'all',
      products: [],
    } as ReducerStateType,
    initialReducerState,
  );

  const handleUpdateProducts = async (filter: CategoryTypes) => {
    searchParams.addSearchParam({
      key: 'filter',
      value: filter,
    });

    if (filter === 'all') {
      dispatch(
        productUpdate({
          products: await getAllProducts(),
        }),
      );
      return;
    }
    dispatch(
      productCategoryUpdate({
        products: await getProductsOfCategory(filter),
        category: filter,
      }),
    );
  };

  useEffect(() => {
    handleUpdateProducts(stateProduct.category);
  }, []);

  return {
    stateProduct,
    handleUpdateProducts,
  };
};
