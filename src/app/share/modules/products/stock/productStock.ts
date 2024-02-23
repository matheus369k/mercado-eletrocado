import { recoveryCompoundArray, transformSimpleArray } from "..";
import {
  CategoryProducts,
  ProductsInfor,
} from "../../../../@types/types-interfaces";

export const stockProducts = (objectProducts: ProductsInfor[]): object[] => {
  const collectionProduct: object[] = [];
  let countStock: object[] = [];

  for (
    let indexProduct = 0;
    indexProduct < objectProducts.length;
    indexProduct++
  ) {
    const PositionOfProduct = objectProducts.indexOf(
      objectProducts[indexProduct]
    );
    const idOfProduct = objectProducts[indexProduct]["id"];

    countStock = objectProducts.filter(
      (element) => element == objectProducts[indexProduct]
    );

    if (PositionOfProduct != indexProduct) {
      collectionProduct.push({ have: 0, id: idOfProduct });
    } else if (
      PositionOfProduct !=
      objectProducts.lastIndexOf(objectProducts[indexProduct])
    ) {
      collectionProduct.push({ have: countStock.length, id: idOfProduct });
    } else {
      collectionProduct.push({ have: 1, id: idOfProduct });
    }
  }

  return collectionProduct;
};

export const stockUpdateState = (
  oldProductStock: CategoryProducts,
  productEnvoyIds: number[]
) => {
  const newProductStock: ProductsInfor[] = [];

  const ArraySimpleProductStock = transformSimpleArray(oldProductStock);

  ArraySimpleProductStock.forEach((RandProd: ProductsInfor) => {
    if (productEnvoyIds.includes(Object(RandProd).id)) {
      const numberRemoStock = productEnvoyIds.filter(
        (ProdEnvo: number) => Object(RandProd).id == ProdEnvo
      );

      RandProd = Object.assign({}, RandProd);

      Object(RandProd).stock -= numberRemoStock.length;

      RandProd = Object.freeze(RandProd);
    }

    newProductStock.push(RandProd);
  });

  const OldformArray: CategoryProducts = recoveryCompoundArray(newProductStock);

  return OldformArray;
};

export const verificationStockOfproduct = (
  idProudct: number,
  storeCarProducts: number[],
  storeAllProducts: CategoryProducts,
  storeEnvoyProducts: number[],
  activeAddClass = true
) => {
  let newArraySimple = transformSimpleArray(storeAllProducts);

  let stockPcD = storeCarProducts.filter(
    (productEqual: number) => productEqual == idProudct
  );

  newArraySimple = newArraySimple.filter(
    (product: object) => Object(product).id == idProudct
  );

  const productsEnvoyStorage = storeEnvoyProducts.filter(
    (envoyId: number) => envoyId == idProudct
  );

  stockPcD = stockPcD.concat(productsEnvoyStorage);

  const validationStock =
    productsEnvoyStorage.length + Object(newArraySimple[0]).stock >
    stockPcD.length;

  if (activeAddClass) {
    const elementsBtn = document.querySelectorAll(`.btn-buy${idProudct}`);

    elementsBtn.forEach((elementBtn) => {
      if (!validationStock) {
        elementBtn.classList.add("withoutStock");
      } else if (elementBtn.classList.contains("withoutStock")) {
        elementBtn.classList.remove("withoutStock");
      }
    });
  }

  return validationStock;
};
