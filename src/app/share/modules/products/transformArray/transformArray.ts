import {
  CategoryProducts,
  ProductsInfor,
} from "../../../../@types/types-interfaces";

export const recoveryCompoundArray = (
  newProductStock: ProductsInfor[]
): CategoryProducts => {
  const productRecoverform = newProductStock.reduce(
    (producprev: object, productCurr: object) => {
      Object(producprev)[Object(productCurr).category] =
        Object(producprev)[Object(productCurr).category] || [];
      Object(producprev)[Object(productCurr).category].push(productCurr);

      return producprev;
    },
    {}
  );

  return productRecoverform as CategoryProducts;
};

export const transformSimpleArray = (
  oldProductStock: CategoryProducts
): ProductsInfor[] => {
  let newsimpleArray: ProductsInfor[] = [];

  for (const key in oldProductStock) {
    const categoryArray: ProductsInfor[] = Object(oldProductStock)[key];

    const objectAll = categoryArray.map((product: ProductsInfor) => product);

    newsimpleArray = newsimpleArray.concat(objectAll);
  }

  return newsimpleArray;
};

export const collectProductsOfState = (
  AllstateLocal: CategoryProducts,
  idProducts: number[]
) => {
  let newArrayCollectProducts: ProductsInfor[] = [];

  const AllstateSimpleArray = transformSimpleArray(AllstateLocal);

  idProducts.forEach((idProduct: number) => {
    const Objectselected: ProductsInfor[] = AllstateSimpleArray.filter(
      (productsObject: ProductsInfor) => Object(productsObject).id == idProduct
    );

    newArrayCollectProducts = newArrayCollectProducts.concat(Objectselected);
  });

  return newArrayCollectProducts;
};
