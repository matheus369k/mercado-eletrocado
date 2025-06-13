import type { ProductIdType } from '@/@types/product';

interface DetectFavoriteProductType {
  id: ProductIdType;
  stateDatas: ProductIdType[];
}

export const detectFavoriteProduct = ({ id, stateDatas }: DetectFavoriteProductType) => {
  const IsFavoriteProduct = stateDatas.indexOf(id) === -1 ? false : true;

  return {
    IsFavoriteProduct,
  };
};
