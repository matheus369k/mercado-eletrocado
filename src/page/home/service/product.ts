import { fetchProducts } from '@/lib/axios';
import type { CategoryTypes } from '../hook/use-products';
import type { CategoryProductsType, ProductType } from '@/@types/product';
import axios from 'axios';
import { env } from '@/env';

export const getAllProducts = async () => {
  try {
    const response = await Promise.race([
      fetchProducts.get('products'),
      axios.get(env.VITE_GITHUB_DATABASE_URL),
    ]);
    const data: CategoryProductsType = await response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductsOfCategory = async (category: CategoryTypes) => {
  try {
    const response = await fetchProducts.get(`products/${category}`);
    const data: ProductType[] = await response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
