import { ProductType } from '@/@types/product';
import { LOCAL_STORAGE_KEYS } from '@/util/const';
import { browserStorageVariables } from '@/util/local-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  selected: ProductType | null;
};

const initialState: InitialStateType = {
  selected: browserStorageVariables.get(LOCAL_STORAGE_KEYS.SELECTED_PRODUCT),
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addSelectProduct: (state, action: PayloadAction<ProductType>) => {
      browserStorageVariables.add({
        key: LOCAL_STORAGE_KEYS.SELECTED_PRODUCT,
        value: JSON.stringify(action.payload),
      });
      state.selected = action.payload;
    },
    removeSelectProduct: (state) => {
      browserStorageVariables.remove(LOCAL_STORAGE_KEYS.SELECTED_PRODUCT);
      state.selected = initialState.selected;
    },
  },
});

export const { addSelectProduct, removeSelectProduct } = productReducer.actions;
export default productReducer.reducer;
