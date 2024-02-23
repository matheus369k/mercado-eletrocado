import { TbTruckDelivery } from "react-icons/tb";
import { BsChevronUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

import { useEffect } from "react";

import { RenderProducts } from "../../../../../share/components/renderCards/RenderProducts";
import { appUseSelector } from "../../../../../store/hook";
import { collectProductsOfState } from "../../../../../share/modules/products/transformArray/transformArray";
import { hiddeContainerEmpty } from "../../../../../share/modules/addClasses/AddclassElements";

import Button from "../../../../../share/components/buttonScrollList/Button";

import "../../../../../styles/card-Products.css";
import "./index.css";
import "./responsive.css";

export default function ProductEnvoy() {
  const storeAllProducts = appUseSelector((state) => state.storeAllProducts);
  const stateProductEnvoy = appUseSelector((state) => state.productEnvoy);
  const cardshidde = document.querySelectorAll(".cardRepeatHider");

  useEffect(() => {
    hiddeContainerEmpty("#envoySection", "emptyEnvoy", stateProductEnvoy);
  }, [stateProductEnvoy]);

  return (
    <section className="productEnvoy">
      <h2>
        <TbTruckDelivery />
        Produtos a Caminho
      </h2>
      {stateProductEnvoy.length == 0 && <p>não há produtos Aqui!!</p>}
      <div
        className={
          stateProductEnvoy.length - cardshidde.length == 0
            ? ""
            : stateProductEnvoy.length - cardshidde.length == 1
            ? "heightContainerOne"
            : "heightContainerTwo"
        }
      >
        <Button
          title="scroll"
          className="btn-up btnsTopDown"
          handleScrollListProps={[
            ".productEnvoy>div>ul",
            160,
            ".cardRepeatHider",
          ]}
          type="button"
          icon={<BsChevronUp />}
          stateRedux={stateProductEnvoy}
        />
        <ul className="envoySection">
          {RenderProducts(
            collectProductsOfState(storeAllProducts, stateProductEnvoy),
            "envoy"
          )}
        </ul>
        <Button
          title="scroll"
          className="btn-down btnsTopDown"
          handleScrollListProps={[
            ".productEnvoy>div>ul",
            -160,
            ".cardRepeatHider",
          ]}
          type="button"
          icon={<BsChevronDown />}
          stateRedux={stateProductEnvoy}
        />
      </div>
    </section>
  );
}
