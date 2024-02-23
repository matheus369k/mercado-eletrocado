import { useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";

import { randowProducts } from "../../store/redux/productStataSlice";
import { appUseSelector } from "../../store/hook";
import { RenderProducts } from "../../share/components/renderCards/RenderProducts";
import {
  ReloadPageAddclassElements,
  collectProductsOfState,
  randowProductSelected,
} from "../../share/modules/index";

import CategoryFilter from "./categoryFilter/CategoryFilter";

import "../../styles/card-Products.css";
import "./index.css";
import "./responsive.css";

function Home() {
  const storeAllProducts = appUseSelector(state => state.storeAllProducts);
  const stateRandowProduct = appUseSelector(state => state.randowProduct);
  const [category, setCategory] = useState<string>("all");
  const randowProduct: number[] | undefined = randowProductSelected(
    category,
    12
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(randowProducts(randowProduct));
    ReloadPageAddclassElements("nav-element", "currentBar");
  }, [storeAllProducts, category]);

  return (
    <Fragment>
      <CategoryFilter setCategory={setCategory} />
      <ul className="home">
        {RenderProducts(
          collectProductsOfState(storeAllProducts, stateRandowProduct),
          "home"
        )}
      </ul>
    </Fragment>
  );
}

export default Home;
