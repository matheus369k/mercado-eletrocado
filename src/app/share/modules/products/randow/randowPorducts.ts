import { appUseSelector } from "../../../../store/hook";
import { RandowNumber } from "../index";

const categoryProducts: Array<string> = ["notebook", "tablet", "phone"];

export const randowProductSelected = (
  category: string,
  quantityProduct: number
) => {
  const storeAllProducts = appUseSelector((state) => state.storeAllProducts);
  const focusApparatus: number[] = [];
  let randowCategory: number = 0;

  if (category != "all") {
    categoryProducts.forEach(
      (categoryProduct: string, indexCategory: number) => {
        if (categoryProduct == category) {
          randowCategory = indexCategory;
          quantityProduct = Object(storeAllProducts)[categoryProduct].length;
        }
      }
    );
  }

  for (let i = 0; i < quantityProduct; i++) {
    
    if (storeAllProducts.notebook.length == 0) continue;

    if (category == "all") randowCategory = RandowNumber(3);

    const randowindex: number = RandowNumber(5);

    const randowProduct: number =
      Object.values(storeAllProducts)[randowCategory][randowindex].id;

    if (focusApparatus.indexOf(randowProduct) != -1) i--;
    else focusApparatus.push(randowProduct);
  }

  return focusApparatus;
};
