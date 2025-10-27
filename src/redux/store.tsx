import { configureStore } from '@reduxjs/toolkit';
import envoyReducer from './envoy/slice';
import cartReducer from './cart/slice';

export const store = configureStore({
  reducer: {
    envoy: envoyReducer,
    cart: cartReducer,
  },
});

export type hootState = ReturnType<typeof store.getState>;
