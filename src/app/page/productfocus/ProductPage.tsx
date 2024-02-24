import { IoArrowBack } from "react-icons/io5";

import { useDispatch } from "react-redux";

import { focusProductRemove } from "../../store/redux/productStataSlice";
import { RenderProducts } from "../../share/components/renderCards/RenderProducts";
import { appUseSelector } from "../../store/hook";

import "./index.css";
import "./responsive.css";

export default function ProductPage() {
  const product = appUseSelector((state) => state.product);
  const dispatch = useDispatch();

  document.querySelectorAll(".nav-element").forEach((element) => {
    element.addEventListener("click", () => dispatch(focusProductRemove()));
  });

  return (
    <ul className="productpage animationclass">
      <li className="iconsClose">
        <i onClick={() => dispatch(focusProductRemove())}>
          <IoArrowBack />
        </i>
      </li>
      {RenderProducts(product, "product")}
    </ul>
  );
}
