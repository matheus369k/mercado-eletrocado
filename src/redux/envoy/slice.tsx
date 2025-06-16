/* eslint-disable indent */
import { SliceProductEnvoyType } from '@/@types/product';
import { AUTO_CONNECTION, BROWSER_STORAGE_KEYS } from '@/util/const';
import { browserLocalStorage } from '@/util/browser-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
  envoyProducts: SliceProductEnvoyType[];
};

const restoreEnvoyDatas = browserLocalStorage.get(BROWSER_STORAGE_KEYS.ENVOY_PRODUCT);
const initialState: InitialStateProps = {
  envoyProducts: AUTO_CONNECTION && restoreEnvoyDatas ? restoreEnvoyDatas : [],
};

const envoyReducer = createSlice({
  name: 'envoy',
  initialState,
  reducers: {
    addEnvoyProducts: (state, action: PayloadAction<Omit<SliceProductEnvoyType, 'arrival_at'>>) => {
      const date = new Date();
      const increaseEnvoyProduct: SliceProductEnvoyType = {
        products: action.payload.products,
        payment_type: action.payload.payment_type,
        arrival_at: new Date(date.setTime(date.getTime() + 21 * 24 * 60 * 60 * 1000)).toISOString(),
      };

      browserLocalStorage.add({
        key: BROWSER_STORAGE_KEYS.ENVOY_PRODUCT,
        value: JSON.stringify([increaseEnvoyProduct, ...state.envoyProducts]),
      });

      state.envoyProducts = [increaseEnvoyProduct, ...state.envoyProducts];
    },
  },
});

export const { addEnvoyProducts } = envoyReducer.actions;
export default envoyReducer.reducer;
