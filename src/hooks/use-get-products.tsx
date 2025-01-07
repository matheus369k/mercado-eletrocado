import { RemoveDivisionOfDatasForCategory } from '@/functions';
import { appUseSelector } from '@/redux/hook';
import {
  SliceProductCartAndEnvoyType,
  ProductIdType,
  ProductType,
  ProductCartAndEnvoyType,
} from '@/@types/product';

type HandleEnvoyAndCartDatasType = Omit<SliceProductCartAndEnvoyType, 'price'>;
type HandleRandomOrderAndFavoriteProductDatasType = ProductIdType;

export const useGetProducts = () => {
  const { datas } = appUseSelector((state) => state.product);
  const objectProducts = RemoveDivisionOfDatasForCategory(datas);

  const handleEnvoyAndCartDatas = (CartOrEnvoyDatas: HandleEnvoyAndCartDatasType[]) => {
    const dataProducts: ProductCartAndEnvoyType[] = [];

    for (const datas of CartOrEnvoyDatas) {
      for (const product of objectProducts) {
        if (product.id === datas.id) {
          dataProducts.push({
            id: datas.id,
            data: product,
            quantity: datas.quantity,
          });
        }
      }
    }

    return { dataProducts };
  };

  const handleRandomOrderAndFavoriteProductDatas = (
    randomOrderOrFavoriteDatas: HandleRandomOrderAndFavoriteProductDatasType[],
  ) => {
    const dataProducts: ProductType[] = [];

    for (const dataId of randomOrderOrFavoriteDatas) {
      for (const product of objectProducts) {
        if (product.id === dataId) {
          dataProducts.push(product);
        }
      }
    }

    return { dataProducts };
  };

  return { handleEnvoyAndCartDatas, handleRandomOrderAndFavoriteProductDatas };
};
