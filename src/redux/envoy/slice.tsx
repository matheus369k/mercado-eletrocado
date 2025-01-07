import { SliceProductCartAndEnvoyType } from '@/@types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = SliceProductCartAndEnvoyType;

const initialState: { envoyProducts: InitialStateType[] } = {
  envoyProducts: [],
};

const envoyReducer = createSlice({
  name: 'envoy',
  initialState,
  reducers: {
    addEnvoyProducts: (state, action: PayloadAction<InitialStateType[]>) => {
      const increaseEnvoyProduct = [];

      for (const actionProduct of action.payload) {
        state.envoyProducts.forEach((stateProduct) => {
          if (stateProduct.id === actionProduct.id) {
            increaseEnvoyProduct.push({
              ...actionProduct,
              quantity: stateProduct.quantity + actionProduct.quantity,
            });
          }
        });

        const noHasActionProductEqualOnStorage = state.envoyProducts.every(
          (stateProduct) => stateProduct.id !== actionProduct.id,
        );

        if (noHasActionProductEqualOnStorage) {
          increaseEnvoyProduct.push(actionProduct);
        }
      }

      for (const stateProduct of state.envoyProducts) {
        const noHasStateProductEqualOnStorage = action.payload.every(
          (actionProduct) => actionProduct.id !== stateProduct.id,
        );

        if (noHasStateProductEqualOnStorage) {
          increaseEnvoyProduct.push(stateProduct);
        }
      }

      localStorage.setItem('envoyProducts', JSON.stringify(increaseEnvoyProduct));

      state.envoyProducts = increaseEnvoyProduct;
    },
  },
});

export const { addEnvoyProducts } = envoyReducer.actions;
export default envoyReducer.reducer;
