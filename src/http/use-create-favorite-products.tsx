import { axiosBackEndAPI } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

type UseCreateFavoriteProductRequest = {
  productId: string;
  price: number;
  image: string;
  name: string;
};

export const useCreateFavoriteProduct = () => {
  return useMutation({
    mutationFn: async (data: UseCreateFavoriteProductRequest) => {
      const { image, name, price, productId } = data;
      const formattedPrice = Number((price % 1).toFixed(2)) * 100 + Math.floor(price) * 100;
      await axiosBackEndAPI
        .post(
          '/api/products/favorite',
          { productId, image, name, price: formattedPrice },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .catch(async (error) => {
          if (error.status === 401) {
            const result = await axiosBackEndAPI.get('/token', {
              withCredentials: true,
            });

            if (result.status === 200) {
              await axiosBackEndAPI.post(
                '/api/products/favorite',
                { productId, image, name, price: formattedPrice },
                {
                  withCredentials: true,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              );
            }
          }
        });
    },
  });
};
