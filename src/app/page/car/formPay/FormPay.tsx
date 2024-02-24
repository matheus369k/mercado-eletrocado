import { FaCreditCard } from "react-icons/fa6";
import { FaPix } from "react-icons/fa6";
import { IoReceiptSharp } from "react-icons/io5";
import { FaBitcoin } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { BsBank2 } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { FaBox } from "react-icons/fa";

import { useDispatch } from "react-redux";

import { AddclassElements } from "../../../share/modules/addClasses/AddclassElements";
import { requiredsuccessbuy } from "../../../store/redux/productStataSlice";
import { FetchAxios } from "../../../store/redux/productStataSlice";
import { appUseSelector } from "../../../store/hook";
import { RenderProducts } from "../../../share/components/renderCards/RenderProducts";
import { collectProductsOfState } from "../../../share/modules/products/transformArray/transformArray";
import { calcPriceTotal } from "../../../share/modules/products/price/productPrice";
import { PropsSucessCheck } from "../../../@types/types-interfaces";

import UserDatas from "../../../share/components/userData/UserDatas";
import Button from "../../../share/components/buttonScrollList/Button";

import "./index.css";
import "./resonsive.css";
import { store } from "../../../store/store";

export const FormPay = ({
  setCheckOutBtn,
  setSuccessBuy,
}: PropsSucessCheck) => {
  const stateRequiredProducts = appUseSelector(
    (state) => state.requiredProducts
  );
  const storeAllProducts = appUseSelector((state) => state.storeAllProducts);
  const cardshidde = document.querySelectorAll(".cardRepeatHider");
  const dispatch = useDispatch();

  const handleSelectedFormPay = () => {
    const choicePayForm = document.querySelector(".formpay > ul > .selected");

    if (choicePayForm == null) return;
    
    store.dispatch(FetchAxios());

    setCheckOutBtn(false);

    setSuccessBuy(true);

    dispatch(requiredsuccessbuy());
  };

  return (
    <div className="verificationbuy">
      <i onClick={() => setCheckOutBtn(false)}>
        <IoArrowBack />
      </i>
      <section className="userDatas">
        <h2>
          Informações do <GoPeople />
          usuario
        </h2>
        <UserDatas />
      </section>
      <section className="productsOfbuy">
        <h2>
          Produtos no <PiShoppingCartFill />
          Carrinho
        </h2>
        <div
          className={
            stateRequiredProducts.length - cardshidde.length == 1
              ? "heightContainerOne"
              : "heightContainerTwo"
          }
        >
          <Button
            title="scroll"
            className="btn-up btnsTopDown"
            handleScrollListProps={[
              ".productsOfbuy>div>ul",
              215,
              ".cardRepeatHider",
            ]}
            type="button"
            icon={<BsChevronUp />}
            stateRedux={stateRequiredProducts}
          />
          <ul>
            {RenderProducts(
              collectProductsOfState(storeAllProducts, stateRequiredProducts),
              "buy"
            )}
          </ul>
          <Button
            title="scroll"
            className="btn-down btnsTopDown"
            handleScrollListProps={[
              ".productsOfbuy>div>ul",
              -210,
              ".cardRepeatHider",
            ]}
            type="button"
            icon={<BsChevronDown />}
            stateRedux={stateRequiredProducts}
          />
        </div>
      </section>
      <section className="formpay">
        <h2>
          Forma de <BsBank2 />
          pagamento
        </h2>
        <p>Selecione abaixo a forma de pagamento.</p>
        <ul onMouseOver={() => AddclassElements("Formpay", "selected")}>
          <li className="Formpay">
            <FaCreditCard />
            Cartão
          </li>
          <li className="Formpay">
            <FaPix />
            Pix
          </li>
          <li className="Formpay">
            <IoReceiptSharp />
            Boleto
          </li>
          <li className="Formpay">
            <FaBitcoin />
            Bitcoin
          </li>
        </ul>
      </section>
      <section className="confirmbuy">
        <p>
          <span className="productPcD">
            <strong>
              <FaBox />
              PcD Total:
            </strong>{" "}
            X{stateRequiredProducts.length}
          </span>
          <span className="price">
            <strong>
              <BsBank2 />
              Preço Total:
            </strong>{" "}
            R${calcPriceTotal(storeAllProducts, stateRequiredProducts)}
          </span>
        </p>
        <button
          onClick={() => handleSelectedFormPay()}
          type="button"
          id="btn-confirn-form"
        >
          Comfirmar
        </button>
      </section>
    </div>
  );
};
