import { axiosBackEndAPI } from '@/lib/axios';
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

export const useGetOneProduct = ({ productId }: { productId: string }) => {
  return useQuery({
    queryKey: [productId, 'product'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      try {
        const response = await axiosBackEndAPI.get(`/products?productId=${productId}`);
        const result: ProductType = await response.data;

        if (!result) {
          throw new Error('Not found product');
        }

        return result;
      } catch (error) {
        console.error(error);
      }
    },
  });
};
