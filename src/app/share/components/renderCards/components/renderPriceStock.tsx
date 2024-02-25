import { Fragment } from "react";

import { productPrice } from "../../../modules";

import { ProductsInfor } from "../../../../@types/types-interfaces";

import { FaBox } from "react-icons/fa";

export const renderPriceStock = (product: ProductsInfor) => {
  return (
    <div className="priceStock">
      <ul className="price">{renderAllPrice(50, product.price, product.id)}</ul>
      <span className="stock">
        <FaBox />
        Pcd:{product.stock}
      </span>
    </div>
  );
};

const renderAllPrice = (limite: number, price: number, id: number) => {
  const priceInfor = productPrice(limite, price, id);
  return (
    <Fragment>
      <li className="oldPrice">R${priceInfor.priceDescount.toFixed(2)}</li>
      <li className="newPrice">R${priceInfor.price.toFixed(2)}</li>
      <li className="descount">{priceInfor.percent}% OFF</li>
      <li className="plots">
        em <span>10X de R${priceInfor.divisionTen.toFixed(2)} sem juros</span>
      </li>
    </Fragment>
  );
};
