import { CategoryProductsType } from '@/@types/product';

export const RemoveDivisionOfDatasForCategory = (ProductCategoryDatas: CategoryProductsType) => {
  const { notebook, phone, tablet } = ProductCategoryDatas;
  const datasProductWithoutDivision = notebook.concat(phone, tablet);

  return datasProductWithoutDivision;
};
