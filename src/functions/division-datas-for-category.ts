import { CategoryProductsType, ProductType } from '@/@types/product';

export const divisionDatasForCategory = (newProductStock: ProductType[]) => {
  const productRecoverForm = newProductStock.reduce((prev, curr) => {
    Object(prev)[Object(curr).category] = Object(prev)[Object(curr).category] || [];
    Object(prev)[Object(curr).category].push(curr);

    return prev;
  }, {});

  return productRecoverForm as CategoryProductsType;
};
