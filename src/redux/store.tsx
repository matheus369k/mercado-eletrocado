import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favorite/slice';
import productReducer from './products/slice';
import envoyReducer from './envoy/slice';
import cartReducer from './cart/slice';
import userReducer from './user/slice';

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    product: productReducer,
    envoy: envoyReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export type hootState = ReturnType<typeof store.getState>;
