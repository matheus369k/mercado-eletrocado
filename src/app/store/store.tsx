import { configureStore } from '@reduxjs/toolkit'
import ProductsSlice from './redux/productStataSlice'

export const store = configureStore ({
    reducer: ProductsSlice.reducer
}/* , window.__REDUX_DEVTOOLS_EXTENSION__() && window.__REDUX_DEVTOOLS_EXTENSION__() */);

export type hootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.getState;
