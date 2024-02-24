import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getAllProducts } from "../../../store/redux/productStataSlice";
import { redirection } from "../../../share/modules/redirectionPage/SwitchPage";
import { appUseSelector } from "../../../store/hook";
import { stockUpdateState } from "../../../share/modules/index";
import { PropsSucess } from "../../../@types/types-interfaces";

import "./index.css";
import "./responsive.css";

export const SuccessBuy = ({ setSuccessBuy }: PropsSucess) => {
  const storeAllProducts = appUseSelector((state) => state.storeAllProducts);
  const storeProductEnvoy = appUseSelector((state) => state.productEnvoy);
  const newStockValue = stockUpdateState(storeAllProducts, storeProductEnvoy);
  const userState = appUseSelector((state) => state.user);
  const url = `${window.location.origin}/mercado-eletrocado/#`;
  const dispatch = useDispatch();

  useEffect(() => {
    redirection(userState, url, "nav-element", "currentBar", true);

    setSuccessBuy(false);
    dispatch(getAllProducts(newStockValue));

    localStorage.setItem("productEnvoy", `${storeProductEnvoy}`);

    localStorage.removeItem("carProducts");

    const confirmMsg = document.createElement("span");
    confirmMsg.setAttribute("class", "comfirmMsg");
    confirmMsg.textContent = `Compra feita com Sucesso!!`;
    document.body.appendChild(confirmMsg);

    setTimeout(() => {
      document.getElementsByClassName("comfirmMsg")[0].remove();
    }, 5000);

  }, []);

  return (
    <div className="successBoy">
      <i></i>
      <p>Espere Um Momento Confirmando A Compra... </p>
    </div>
  );
};
