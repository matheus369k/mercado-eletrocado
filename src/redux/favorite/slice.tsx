import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProductType, ProductIdType } from '@/@types/product';
import { browserStorageVariables } from '@/util/local-storage';
import { LOCAL_STORAGE_KEYS } from '@/util/const';

const initialState: { favoriteProducts: ProductType[] } = {
  favoriteProducts: browserStorageVariables.get(LOCAL_STORAGE_KEYS.FAVORITE_PRODUCT) || [],
};

const favoriteReducer = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<ProductType>) => {
      const increaseFavoriteProduct = state.favoriteProducts.concat(action.payload);

      browserStorageVariables.add({
        key: LOCAL_STORAGE_KEYS.FAVORITE_PRODUCT,
        value: JSON.stringify(increaseFavoriteProduct),
      });

      state.favoriteProducts = increaseFavoriteProduct;
    },
    removeFavoriteProduct: (state, action: PayloadAction<ProductIdType>) => {
      const decrementFavoriteProduct = state.favoriteProducts.filter(
        (product) => product.id !== action.payload,
      );

      browserStorageVariables.add({
        key: LOCAL_STORAGE_KEYS.FAVORITE_PRODUCT,
        value: JSON.stringify(decrementFavoriteProduct),
      });

      state.favoriteProducts = decrementFavoriteProduct;
    },
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } = favoriteReducer.actions;
export default favoriteReducer.reducer;
