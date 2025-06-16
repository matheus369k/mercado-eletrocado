import { ProductType } from '@/@types/product';
import { BROWSER_STORAGE_KEYS } from '@/util/const';
import { browserLocalStorage } from '@/util/browser-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  selected: ProductType | null;
};

const initialState: InitialStateType = {
  selected: browserLocalStorage.get(BROWSER_STORAGE_KEYS.SELECTED_PRODUCT),
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addSelectProduct: (state, action: PayloadAction<ProductType>) => {
      browserLocalStorage.add({
        key: BROWSER_STORAGE_KEYS.SELECTED_PRODUCT,
        value: JSON.stringify(action.payload),
      });
      state.selected = action.payload;
    },
    removeSelectProduct: (state) => {
      browserLocalStorage.remove(BROWSER_STORAGE_KEYS.SELECTED_PRODUCT);
      state.selected = initialState.selected;
    },
  },
});

export const { addSelectProduct, removeSelectProduct } = productReducer.actions;
export default productReducer.reducer;
