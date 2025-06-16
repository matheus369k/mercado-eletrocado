import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProductType, ProductIdType } from '@/@types/product';
import { browserLocalStorage } from '@/util/browser-storage';
import { AUTO_CONNECTION, BROWSER_STORAGE_KEYS } from '@/util/const';

const restoreFavoriteDatas = browserLocalStorage.get(BROWSER_STORAGE_KEYS.FAVORITE_PRODUCT);
const initialState: { favoriteProducts: ProductType[] } = {
  favoriteProducts: AUTO_CONNECTION && restoreFavoriteDatas ? restoreFavoriteDatas : [],
};

const favoriteReducer = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<ProductType>) => {
      const increaseFavoriteProduct = [action.payload, ...state.favoriteProducts];

      browserLocalStorage.add({
        key: BROWSER_STORAGE_KEYS.FAVORITE_PRODUCT,
        value: JSON.stringify(increaseFavoriteProduct),
      });

      state.favoriteProducts = increaseFavoriteProduct;
    },
    removeFavoriteProduct: (state, action: PayloadAction<ProductIdType>) => {
      const decrementFavoriteProduct = state.favoriteProducts.filter(
        (product) => product.id !== action.payload,
      );

      browserLocalStorage.add({
        key: BROWSER_STORAGE_KEYS.FAVORITE_PRODUCT,
        value: JSON.stringify(decrementFavoriteProduct),
      });

      state.favoriteProducts = decrementFavoriteProduct;
    },
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } = favoriteReducer.actions;
export default favoriteReducer.reducer;
