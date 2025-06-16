/* eslint-disable indent */
import { CATEGORY_PRODUCTS_TYPES } from '@/util/const';
import type { CategoryTypes, ReducerStateType } from '../';
import { searchParams } from '@/util/search-params';

const REDUCER_ACTION_TYPES = {
  PRODUCT_UPDATE: 'product/update',
  PRODUCT_CATEGORY_UPDATE: 'product/category/update',
};

export const { productCategoryUpdate, productUpdate } = {
  productUpdate: (payload: Omit<ReducerStateType, 'category'>) => {
    return {
      type: REDUCER_ACTION_TYPES.PRODUCT_UPDATE,
      payload,
    };
  },
  productCategoryUpdate: (payload: ReducerStateType) => {
    return {
      type: REDUCER_ACTION_TYPES.PRODUCT_CATEGORY_UPDATE,
      payload,
    };
  },
};

export const reducer = (
  state: ReducerStateType,
  action: { type: string; payload: ReducerStateType },
): ReducerStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.PRODUCT_UPDATE:
      return {
        category: 'all',
        products: action.payload.products,
      };
    case REDUCER_ACTION_TYPES.PRODUCT_CATEGORY_UPDATE:
      return {
        category: action.payload.category,
        products: action.payload.products,
      };
    default:
      return state;
  }
};

export const initialReducerState = (state: ReducerStateType): ReducerStateType => {
  const queryFilter = searchParams.getSearchParam('filter');

  if (!queryFilter) return state;
  if (CATEGORY_PRODUCTS_TYPES[queryFilter]) {
    return {
      ...state,
      category: queryFilter as CategoryTypes,
    };
  }

  return state;
};
