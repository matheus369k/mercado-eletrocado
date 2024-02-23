/* import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryProducts } from "../@types/types-interfaces";
import Axios from "axios";

export const FetchAxios = createAsyncThunk(
  "ProductsSlice/FetchAxios/fulfilled",
  async () => {
    const url = "https://matheus369k.github.io/Data/eletrocado-api.json";
    const axios = await Axios.get(url);
    const response: CategoryProducts = await axios.data;
    return response
  }
);
 */