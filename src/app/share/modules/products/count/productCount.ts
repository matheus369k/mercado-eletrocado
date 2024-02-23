import { verificationStockOfproduct } from "..";
import { CategoryProducts } from "../../../../@types/types-interfaces";

export const countBuyProduct = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  idProudct: number,
  ammount: number,
  maxStockProduct: CategoryProducts,
  requiredProducts: number[],
  productEnvoy: number[],
  page: string
) => {
  const elementShowPcdBuy = document.querySelector(`.displayPcdId${idProudct}`);
  const numberShowsPcd: number = parseInt(
    elementShowPcdBuy?.textContent || "1"
  );
  let idProductCount: number[] = [];
  e.stopPropagation();

  if (ammount > 0 && page != "car") {
    for (let indexPcd = 0; indexPcd < numberShowsPcd; indexPcd++) {
      idProductCount.push(idProudct);
    }

    idProductCount = idProductCount.concat(requiredProducts);

    const vericationStock = verificationStockOfproduct(
      idProudct,
      idProductCount,
      maxStockProduct,
      productEnvoy,
      false
    );

    if (!vericationStock) return;
  } else {
    const productCar = requiredProducts.filter(
      (requirProdu: number) => requirProdu == idProudct
    );

    if (productCar.length <= numberShowsPcd && page == "car") return;
  }

  if (elementShowPcdBuy == undefined) return;

  if (numberShowsPcd == 1 && ammount < 0) return;

  elementShowPcdBuy.innerHTML = `${numberShowsPcd + ammount}`;
};
