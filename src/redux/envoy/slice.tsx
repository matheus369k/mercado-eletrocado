import { SliceProductEnvoyType } from '@/@types/product';
import { LOCAL_STORAGE_KEYS } from '@/util/const';
import { browserStorageVariables } from '@/util/local-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
  envoyProducts: SliceProductEnvoyType[];
};

const initialState: InitialStateProps = {
  envoyProducts: browserStorageVariables.get(
    browserStorageVariables.get(LOCAL_STORAGE_KEYS.ENVOY_PRODUCT),
  ) || [
    {
      arrival_at: null,
      payment_type: null,
      products: [],
    },
  ],
};

const envoyReducer = createSlice({
  name: 'envoy',
  initialState,
  reducers: {
    addEnvoyProducts: (state, action: PayloadAction<Omit<SliceProductEnvoyType, 'arrival_at'>>) => {
      const increaseEnvoyProduct: SliceProductEnvoyType = {
        products: action.payload.products,
        payment_type: action.payload.payment_type,
        arrival_at: new Date().toISOString(),
      };

      browserStorageVariables.add({
        key: LOCAL_STORAGE_KEYS.ENVOY_PRODUCT,
        value: JSON.stringify([...state.envoyProducts, increaseEnvoyProduct]),
      });

      state.envoyProducts = [...state.envoyProducts, increaseEnvoyProduct];
    },
  },
});

export const { addEnvoyProducts } = envoyReducer.actions;
export default envoyReducer.reducer;
