import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favorite/slice';
import productReducer from './product/slice';
import envoyReducer from './envoy/slice';
import cartReducer from './cart/slice';

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    product: productReducer,
    envoy: envoyReducer,
    cart: cartReducer,
  },
});

export type hootState = ReturnType<typeof store.getState>;
