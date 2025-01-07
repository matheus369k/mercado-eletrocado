import { SliceProductCartAndEnvoyType } from '@/@types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartProductStateType = SliceProductCartAndEnvoyType;

type InitialStateType = {
  cartProducts: CartProductStateType[];
  totalPrice: number;
};

const initialState: InitialStateType = {
  cartProducts: [],
  totalPrice: 0,
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartProducts: (state, action: PayloadAction<CartProductStateType[]>) => {
      const increaseCartProduct = [];

      for (const actionProduct of action.payload) {
        state.cartProducts.forEach((stateProduct) => {
          if (stateProduct.id === actionProduct.id) {
            increaseCartProduct.push({
              ...actionProduct,
              quantity: stateProduct.quantity + actionProduct.quantity,
            });
          }
        });

        const noHasActionProductEqualOnStorage = state.cartProducts.every(
          (stateProduct) => stateProduct.id !== actionProduct.id,
        );

        if (noHasActionProductEqualOnStorage) {
          increaseCartProduct.push(actionProduct);
        }
      }

      for (const stateProduct of state.cartProducts) {
        const noHasStateProductEqualOnStorage = action.payload.every(
          (actionProduct) => actionProduct.id !== stateProduct.id,
        );

        if (noHasStateProductEqualOnStorage) {
          increaseCartProduct.push(stateProduct);
        }
      }

      const calcTotalPrice = increaseCartProduct.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity * currentValue.price,
        0,
      );

      localStorage.setItem('cartProducts', JSON.stringify(increaseCartProduct));

      state.cartProducts = increaseCartProduct;
      state.totalPrice = calcTotalPrice;
    },
    removeCartProduct: (
      state,
      action: PayloadAction<Omit<SliceProductCartAndEnvoyType, 'price'>>,
    ) => {
      const decrementCartProducts = state.cartProducts
        .map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity - action.payload.quantity,
            };
          }

          return product;
        })
        .filter((product) => product.quantity > 0);

      const calcTotalPrice = decrementCartProducts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity * currentValue.price,
        0,
      );

      localStorage.setItem('cartProducts', JSON.stringify(decrementCartProducts));

      state.cartProducts = decrementCartProducts;
      state.totalPrice = calcTotalPrice;
    },
    removeAllCartProducts: (state) => {
      localStorage.setItem('cartProducts', JSON.stringify(initialState.cartProducts));

      state.cartProducts = initialState.cartProducts;
      state.totalPrice = initialState.totalPrice;
    },
  },
});

export const { addCartProducts, removeCartProduct, removeAllCartProducts } = cartReducer.actions;
export default cartReducer.reducer;
