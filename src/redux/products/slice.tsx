import { CategoryProductsType, SliceProductCartAndEnvoyType, ProductType } from '@/@types/product';
import { divisionDatasForCategory, RemoveDivisionOfDatasForCategory } from '@/functions';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { env } from '@/env';
import axios from 'axios';

type UpdateProductsDatasStockType = Omit<SliceProductCartAndEnvoyType, 'price'>;

type InitialStateType = {
  selected: ProductType | null;
  datas: CategoryProductsType;
};

const initialState: InitialStateType = {
  datas: {
    notebook: [],
    phone: [],
    tablet: [],
  },
  selected: null,
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addSelectProduct: (state, action: PayloadAction<ProductType>) => {
      localStorage.setItem('selectedProduct', JSON.stringify(action.payload));
      state.selected = action.payload;
    },
    removeSelectProduct: (state) => {
      localStorage.setItem('selectedProduct', JSON.stringify(initialState.selected));
      state.selected = initialState.selected;
    },
    updateProductsDatasStock: (state, action: PayloadAction<UpdateProductsDatasStockType[]>) => {
      const datasProductsWithoutCategoryObject = RemoveDivisionOfDatasForCategory(state.datas);

      const dataProductWithStockRemoveProductInEnvoy = datasProductsWithoutCategoryObject.reduce(
        (productsPrev, productAcc) => {
          const quantityOfProductInEnvoy = action.payload.find(
            (product) => product.id === productAcc.id,
          );

          if (quantityOfProductInEnvoy) {
            return productsPrev.concat({
              ...productAcc,
              stock: productAcc.stock - quantityOfProductInEnvoy.quantity,
            });
          }

          return productsPrev.concat(productAcc);
        },
        [] as ProductType[],
      );

      const datasProductsWithCategoryObject = divisionDatasForCategory(
        dataProductWithStockRemoveProductInEnvoy,
      );

      state.datas = datasProductsWithCategoryObject;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAllProducts.pending, () => {
        sessionStorage.setItem('statusFetchApi', 'Loading');
      })
      .addCase(
        requestAllProducts.fulfilled,
        (state, action: PayloadAction<CategoryProductsType>) => {
          state.datas = action.payload;
          sessionStorage.setItem('statusFetchApi', 'complete');
        },
      )
      .addCase(requestAllProducts.rejected, () => {
        console.log('Error ao se conectar a api json...');
        sessionStorage.setItem('statusFetchApi', 'error');
      });
  },
});

export const requestAllProducts = createAsyncThunk('product/requestAllProducts', async () => {
  const response = await axios.get(env.VITE_DATABASE_URL);
  const data: CategoryProductsType = await response.data.electronics;

  return data;
});

export const { addSelectProduct, removeSelectProduct, updateProductsDatasStock } = productReducer.actions;
export default productReducer.reducer;
