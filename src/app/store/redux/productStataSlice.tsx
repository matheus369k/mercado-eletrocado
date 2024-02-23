import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CategoryProducts, ProductsInfor } from "../../@types/types-interfaces";
import Axios from "axios";

interface ProjectState {
  storeAllProducts: CategoryProducts;
  randowProduct: number[];
  user: object;
  requiredProducts: number[];
  favoriteProducts: number[];
  product: ProductsInfor[];
  productEnvoy: number[];
}

const initialState: ProjectState = {
  storeAllProducts: { notebook: [], tablet: [], phone: [] },
  randowProduct: [],
  user: [],
  requiredProducts: [],
  favoriteProducts: [],
  product: [],
  productEnvoy: [],
};

const productsSlice = createSlice({
  name: "ProductsSlice",
  initialState,
  reducers: {
    getAllProducts: (state, action: PayloadAction<CategoryProducts>) => {
      state.storeAllProducts = action.payload;
    },
    randowProducts: (state, action: PayloadAction<number[]>) => {
      state.randowProduct = action.payload;
    },
    focusProductAdd: (state, action: PayloadAction<ProductsInfor>) => {
      state.product.splice(0, 1, action.payload);
    },
    focusProductRemove: (state) => {
      state.product = initialState.product;
    },
    registerUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
    requiredProducts: (state, action: PayloadAction<number | number[]>) => {
      if (typeof action.payload == "number")
        state.requiredProducts.push(action.payload);
      else state.requiredProducts = action.payload;
    },
    requiredRemoveProducts: (state, action: PayloadAction<number>) => {
      state.requiredProducts.splice(
        state.requiredProducts.indexOf(action.payload),
        1
      );
    },
    requiredsuccessbuy: (state) => {
      state.productEnvoy = state.productEnvoy.concat(state.requiredProducts);
      state.requiredProducts = initialState.requiredProducts;
    },
    addFavoriteProduct: (state, action: PayloadAction<number | number[]>) => {
      if (typeof action.payload == "number")
        state.favoriteProducts.push(action.payload);
      else state.favoriteProducts = action.payload;
    },
    removeFavoriteProduct: (state, action: PayloadAction<number>) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (item) => item != action.payload
      );
    },
    updateEnvoyProducts: (state, action: PayloadAction<number[]>) => {
      state.productEnvoy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      FetchAxios.fulfilled,
      (state, action: PayloadAction<CategoryProducts>) => {
        console.log(action.type)
        state.storeAllProducts = action.payload;
      }
    );
  },
});

export const FetchAxios = createAsyncThunk(
  "ProductsSlice/FetchAxios",
  async () => {
    const url = "https://matheus369k.github.io/Data/eletrocado-api.json";
    const axios = await Axios.get(url);
    const response: CategoryProducts = await axios.data.electronics;
    return response;
  }
);

export const {
  getAllProducts,
  requiredProducts,
  requiredRemoveProducts,
  registerUser,
  addFavoriteProduct,
  removeFavoriteProduct,
  randowProducts,
  focusProductAdd,
  focusProductRemove,
  requiredsuccessbuy,
  updateEnvoyProducts,
} = productsSlice.actions;

export default productsSlice;
