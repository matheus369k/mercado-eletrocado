interface DetectFavoriteProductType {
  id: number;
  stateDatas: number[];
}

export const detectFavoriteProduct = ({ id, stateDatas }: DetectFavoriteProductType) => {
  const IsFavoriteProduct = stateDatas.indexOf(id) === -1 ? false : true;

  return {
    IsFavoriteProduct,
  };
};
