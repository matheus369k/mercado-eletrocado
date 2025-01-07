import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductIdType } from '@/@types/product';

const initialState: { favoriteProducts: ProductIdType[] } = {
  favoriteProducts: [],
};

const favoriteReducer = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action: PayloadAction<ProductIdType[]>) => {
      const increaseFavoriteProduct = state.favoriteProducts.concat(action.payload);

      localStorage.setItem('favoriteProducts', JSON.stringify(increaseFavoriteProduct));

      state.favoriteProducts = increaseFavoriteProduct;
    },
    removeFavoriteProduct: (state, action: PayloadAction<ProductIdType>) => {
      const decrementFavoriteProduct = state.favoriteProducts.filter(
        (productId) => productId !== action.payload,
      );
      
      localStorage.setItem('favoriteProducts', JSON.stringify(decrementFavoriteProduct));

      state.favoriteProducts = decrementFavoriteProduct;
    },
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } = favoriteReducer.actions;
export default favoriteReducer.reducer;
