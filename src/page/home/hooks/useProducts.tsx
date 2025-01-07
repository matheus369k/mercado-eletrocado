import { CategoryProductsType, ProductIdType } from '@/@types/product';
import { generateRandomNumber } from '@/functions';
import { appUseSelector } from '@/redux/hook';
import { useGetProducts } from '@/hooks';

export const useProducts = ({ category: categoryFilter }: { category: string }) => {
  const categoryProducts = ['notebook', 'tablet', 'phone'];
  const { datas } = appUseSelector((state) => state.product);

  const randomOrderProductSelected = ({
    datas,
    filter,
    max,
  }: {
    filter: string;
    max: number;
    datas: CategoryProductsType;
  }) => {
    if (datas.notebook.length === 0) return [];

    const productRandomOrder: ProductIdType[] = [];

    let randomCategory = 0;

    if (filter !== 'all') {
      categoryProducts.forEach((categoryProduct: string, indexCategory: number) => {
        if (categoryProduct === filter) {
          randomCategory = indexCategory;
          max = datas[categoryProduct].length;
        }
      });
    }

    for (let i = 0; i < max; i++) {
      if (filter === 'all') randomCategory = generateRandomNumber(3);

      const randomIndex = generateRandomNumber(5);
      
      const randomProductId: number = Object.values(datas)[randomCategory][randomIndex].id;

      if (productRandomOrder.indexOf(randomProductId) !== -1) {
        i--;
        continue;
      }

      productRandomOrder.push(randomProductId);
    }

    return productRandomOrder;
  };

  const randomOrderDatasProduct = randomOrderProductSelected({
    datas,
    filter: categoryFilter,
    max: 12,
  });
  const { dataProducts } =
    useGetProducts().handleRandomOrderAndFavoriteProductDatas(randomOrderDatasProduct);

  return {
    dataProducts,
  };
};
