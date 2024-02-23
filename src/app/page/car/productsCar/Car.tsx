import { PiShoppingCartFill } from "react-icons/pi";
import { FaMoneyBillWave } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { RenderProducts } from "../../../share/components/renderCards/RenderProducts";
import { appUseSelector } from "../../../store/hook";
import { focusProductRemove } from "../../../store/redux/productStataSlice";
import { redirection } from "../../../share/modules/redirectionPage/SwitchPage";
import { collectProductsOfState } from "../../../share/modules/products/transformArray/transformArray";
import { calcPriceTotal } from "../../../share/modules/products/price/productPrice";
import { PropsCheck } from "../../../@types/types-interfaces";
import { ReloadPageAddclassElements, hiddeContainerEmpty } from "../../../share/modules";

import "../../../styles/card-Products.css";
import "./index.css";
import "./responsive.css";

export const Car = ({ setCheckOutBtn }: PropsCheck) => {
  const storeRequiredProducts = appUseSelector(
    (state) => state.requiredProducts
  );
  const storeAllProducts = appUseSelector((state) => state.storeAllProducts);
  const user = appUseSelector((state) => state.user);
  const url = `${window.location.origin}/mercado-eletrocado/#/user`;
  const dispatch = useDispatch();

  const handleActionClick = () => {
    if (Object.values(user).length == 0) {
      redirection(user, url, "nav-element", "currentBar", false);
      dispatch(focusProductRemove());
    } else setCheckOutBtn(true);
  };

  useEffect(() => {
    hiddeContainerEmpty("#carsection", "emptyCar", storeRequiredProducts)
    ReloadPageAddclassElements("nav-element", "currentBar");
  }, [storeRequiredProducts]);

  return (
    <div className="car">
      <h2>
        Produtos Adicionados ao <PiShoppingCartFill />
        Carrinho
      </h2>
      <div id="carsection">
        <span>
          <FaMoneyBillWave />
          <strong className="price-show">
            R${calcPriceTotal(storeAllProducts, storeRequiredProducts)}
          </strong>
        </span>
        <button onClick={() => handleActionClick()} type="button" id="CheckOut">
          CheckOut
        </button>
        <ul>
          {RenderProducts(
            collectProductsOfState(storeAllProducts, storeRequiredProducts),
            "car"
          )}
        </ul>
      </div>
      {storeRequiredProducts.length == 0 && <p>não há produtos Aqui!!</p>}
    </div>
  );
};
