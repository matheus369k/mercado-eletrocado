import { axiosBackEndAPI } from '@/lib/axios';
import type { CategoryTypes } from '../hook/use-products';
import { useQuery } from '@tanstack/react-query';

export interface ProductType {
  _id: string;
  price: number;
  model: string;
  img: string;
  slide: {
    slide1: string;
    slide2: string;
    slide3: string;
  };
  screen: string;
  processor: string;
  memory: string;
  placeVideo?: string;
  battery?: string;
  category: string;
}

export interface AllProductsType {
  notebook: ProductType[];
  tablet: ProductType[];
  phone: ProductType[];
}

export const useProducts = (category: CategoryTypes) => {
  if (category === 'all') {
    return useQuery({
      queryKey: ['all', 'products'],
      staleTime: 1000 * 60 * 60 * 24,
      queryFn: async () => {
        try {
          const response = await axiosBackEndAPI.get('/products');
          const result: AllProductsType = await response.data;

          if (!result) {
            throw new Error('Not found products');
          }

          return result;
        } catch (error) {
          console.error(error);
        }
      },
    });
  }

  return useQuery({
    queryKey: ['category-products', category],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      try {
        const response = await axiosBackEndAPI.get(`/products/${category}`);
        const result: ProductType[] = await response.data;

        if (!result) {
          throw new Error('Not found products category');
        }

        return result;
      } catch (error) {
        console.error(error.message);
      }
    },
  });
};
