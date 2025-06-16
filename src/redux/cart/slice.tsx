/* eslint-disable indent */
import { SliceProductCartType, ProductIdType } from '@/@types/product';
import { AUTO_CONNECTION, BROWSER_STORAGE_KEYS } from '@/util/const';
import { browserLocalStorage } from '@/util/browser-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  cartProducts: SliceProductCartType[];
  totalPrice: number;
};

type RemoveCartProductProps = Pick<SliceProductCartType, 'quantity'> & {
  id: ProductIdType;
};

const restoreCartDatas = browserLocalStorage.get(BROWSER_STORAGE_KEYS.CART_PRODUCT);
const initialState: InitialStateType =
  AUTO_CONNECTION && restoreCartDatas
    ? restoreCartDatas
    : {
        cartProducts: [],
        totalPrice: 0,
      };

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartProducts: (state, action: PayloadAction<SliceProductCartType[]>) => {
      const increaseCartProduct: SliceProductCartType[] = [];

      for (const actionProduct of action.payload) {
        state.cartProducts.forEach((stateProduct) => {
          if (stateProduct.data.id === actionProduct.data.id) {
            increaseCartProduct.push({
              ...actionProduct,
              quantity: stateProduct.quantity + actionProduct.quantity,
            });
          }
        });

        const noHasActionProductEqualOnStorage = state.cartProducts.every(
          (stateProduct) => stateProduct.data.id !== actionProduct.data.id,
        );

        if (noHasActionProductEqualOnStorage) {
          increaseCartProduct.push(actionProduct);
        }
      }

      for (const stateProduct of state.cartProducts) {
        const noHasStateProductEqualOnStorage = action.payload.every(
          (actionProduct) => actionProduct.data.id !== stateProduct.data.id,
        );

        if (noHasStateProductEqualOnStorage) {
          increaseCartProduct.push(stateProduct);
        }
      }

      const calcTotalPrice = increaseCartProduct.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.quantity * currentValue.data.price,
        0,
      );

      browserLocalStorage.add({
        key: BROWSER_STORAGE_KEYS.CART_PRODUCT,
        value: JSON.stringify({
          cartProducts: increaseCartProduct,
          totalPrice: calcTotalPrice,
        }),
      });

      state.cartProducts = increaseCartProduct;
      state.totalPrice = calcTotalPrice;
    },
    removeCartProduct: (state, action: PayloadAction<RemoveCartProductProps>) => {
      const decrementCartProducts = state.cartProducts
        .map((product) => {
          if (product.data.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity - action.payload.quantity,
            };
          }

          return product;
        })
        .filter((product) => product.quantity > 0);

      const calcTotalPrice = decrementCartProducts.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.quantity * currentValue.data.price,
        0,
      );

      browserLocalStorage.add({
        key: BROWSER_STORAGE_KEYS.CART_PRODUCT,
        value: JSON.stringify({
          cartProducts: decrementCartProducts,
          totalPrice: calcTotalPrice,
        }),
      });

      state.cartProducts = decrementCartProducts;
      state.totalPrice = calcTotalPrice;
    },
    removeAllCartProducts: (state) => {
      browserLocalStorage.remove(BROWSER_STORAGE_KEYS.CART_PRODUCT);

      state.cartProducts = initialState.cartProducts;
      state.totalPrice = initialState.totalPrice;
    },
  },
});

export const { addCartProducts, removeCartProduct, removeAllCartProducts } = cartReducer.actions;
export default cartReducer.reducer;
