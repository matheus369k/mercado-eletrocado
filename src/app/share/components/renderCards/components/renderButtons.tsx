import React, { Fragment } from "react";

import { countBuyProduct } from "../../../modules";

import {
  CategoryProducts,
  ProductsInfor,
} from "../../../../@types/types-interfaces";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { PiShoppingCartFill } from "react-icons/pi";
import { MdFavorite } from "react-icons/md";

type RenderButtonsProps = {
  product: ProductsInfor;
  handlefunctionbtn(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    eventBtn: string,
    productId: number
  ): void;
  page: string;
  storeProductEnvoy: number[];
  storeRequiredProducts: number[];
  storeAllProducts: CategoryProducts;
};

export const renderButtons = ({
  product,
  handlefunctionbtn,
  page,
  storeProductEnvoy,
  storeRequiredProducts,
  storeAllProducts,
}: RenderButtonsProps) => {
  return (
    <Fragment>
      {(page == "product" || page == "car") && (
        <div>
          <button
            title="botão para adicionar aos favoritos"
            onClick={(e) => handlefunctionbtn(e, "btn-boy", product.id)}
            className={`btn-buy ${page != "car" && "btn-buy" + product.id}`}
            type="button"
            id="buy"
          >
            {page == "car" ? "Remover" : "Adicionar"}
            <PiShoppingCartFill />
          </button>

          <div className="pcdBuy">
            <button
              onClick={(e) =>
                countBuyProduct(
                  e,
                  product.id,
                  1,
                  storeAllProducts,
                  storeRequiredProducts,
                  storeProductEnvoy,
                  page
                )
              }
              title="botão para adicionar mais produtos"
              type="button"
            >
              <FaPlus />
            </button>

            <span className={`displayPcdId${product.id}`}>1</span>

            <button
              onClick={(e) =>
                countBuyProduct(
                  e,
                  product.id,
                  -1,
                  storeAllProducts,
                  storeRequiredProducts,
                  storeProductEnvoy,
                  page
                )
              }
              title="botão para remover produtos"
              type="button"
            >
              <FaMinus />
            </button>
          </div>
        </div>
      )}
      {page != "envoy" && page != "buy" && (
        <button
          title="botão para adicionar aos favoritos"
          onClick={(e) => handlefunctionbtn(e, "btn-favorite", product.id)}
          className={`btn-favorite ProductId${product.id}`}
          type="button"
        >
          <MdFavorite />
        </button>
      )}
    </Fragment>
  );
};
