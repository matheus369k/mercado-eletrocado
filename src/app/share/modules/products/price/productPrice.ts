import { CategoryProducts } from "../../../../@types/types-interfaces";
import { addAnimationClass } from "../../addClasses/AddclassElements";
import { transformSimpleArray } from "../transformArray/transformArray";

interface Calc {
  divisionTen: number;
  priceDescount: number;
  price: number;
  percent: number;
}

type PriceDescount = {
  idProduct: number;
  percentDescount: number;
};

export const RandowNumber = (limite: number) => {
  const number = Math.floor(Math.random() * limite);
  return number;
};

export const productPrice = (limite: number, price: number, id: number) => {
  let percent = RandowNumber(limite);
  const percentPrice: PriceDescount = {
    idProduct: id,
    percentDescount: percent,
  };

  if (
    localStorage.percentDescount &&
    (localStorage.percentDescount as string).includes(`"idProduct":${id}`)
  ) {
    const objectPercent: PriceDescount[] = JSON.parse(
      localStorage.percentDescount
    );
    const percentFilter = objectPercent.filter(
      (element) => element.idProduct == id
    );
    if (percentFilter.length == 1) {
      percent = percentFilter[0].percentDescount;
    }
  } else {
    const percentDescount: object[] = [];

    if (localStorage.percentDescount)
      percentDescount.push(
        ...JSON.parse(localStorage.percentDescount),
        percentPrice
      );
    localStorage.setItem("percentDescount", JSON.stringify(percentDescount));
  }
  const calcdDescountprice = (price * percent) / 100 + price;
  const divisionTen = calcdDescountprice / 10;

  const calc: Calc = {
    divisionTen: divisionTen,
    priceDescount: calcdDescountprice,
    price: price,
    percent: percent,
  };

  return calc;
};

export const calcPriceTotal = (
  storageAllPrice: CategoryProducts,
  idsUserPrice: number[]
) => {
  try {
    let priceTotal: number = 0;

    const storageAllSimpleArray = transformSimpleArray(storageAllPrice);

    idsUserPrice.forEach((id: number) => {
      const productsBoys = storageAllSimpleArray.filter(
        (product: object) => Object(product).id == id
      )[0];

      priceTotal += Object(productsBoys).price;
    });

    if (Number(sessionStorage.getItem("priceTotal")) != priceTotal)
      addAnimationClass(".price-show", "animation-price", 500);

    sessionStorage.setItem("priceTotal", `${priceTotal}`);

    return priceTotal.toFixed(2);
  } catch (error: unknown) {
    const Erro = (error as TypeError).message;

    console.log(Erro);

    return "00.00";
  }
};
