import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  requiredProducts,
  requiredRemoveProducts,
  addFavoriteProduct,
  removeFavoriteProduct,
  focusProductAdd,
  focusProductRemove,
} from "../../../store/redux/productStataSlice";
import { addClassFavorite } from "../../modules/addClasses/AddclassElements";
import {
  stockProducts,
  verificationStockOfproduct,
  redirection,
} from "../../modules/index";
import { appUseSelector } from "../../../store/hook";
import { ProductsInfor } from "../../../@types/types-interfaces";
import { renderInforProduct } from "./components/renderInforProduct";
import { renderButtons } from "./components/renderButtons";
import { renderSlide } from "./components/renderSlide";
import { renderPriceStock } from "./components/renderPriceStock";

export const RenderProducts = (
  objectProducts: ProductsInfor[],
  page: string
) => {
  const useSelectorUser = appUseSelector((state) => state.user);
  const stateFavoriteProd = appUseSelector((state) => state.favoriteProducts);
  const storeAllProducts = appUseSelector((state) => state.storeAllProducts);
  const storeRequiredProducts = appUseSelector(
    (state) => state.requiredProducts
  );
  const storeProductEnvoy = appUseSelector((state) => state.productEnvoy);
  const dispatch = useDispatch();
  const url = `${window.location.origin}/mercado-eletrocado/#/user`;

  useEffect(() => {
    if (
      stateFavoriteProd.length != 0 &&
      (document.querySelectorAll(".product-favorite").length == 0 ||
        page == "favorite")
    ) {
      for (const favoriteId of stateFavoriteProd) {
        addClassFavorite(favoriteId, false);
      }
    }

    if (storeProductEnvoy.length != 0) {
      for (const productId of storeProductEnvoy) {
        verificationStockOfproduct(
          productId,
          storeRequiredProducts,
          storeAllProducts,
          storeProductEnvoy
        );
      }
    }

    if (storeRequiredProducts.length != 0) {
      for (const productId of storeRequiredProducts) {
        verificationStockOfproduct(
          productId,
          storeRequiredProducts,
          storeAllProducts,
          storeProductEnvoy
        );
      }
    }

    if (stateFavoriteProd.length != 0)
      localStorage.setItem("favoriteProducts", `${stateFavoriteProd}`);
  }, [objectProducts, storeRequiredProducts]);

  const handlefunctionbtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    eventBtn: string,
    productId: number
  ) => {
    e.stopPropagation();

    if (eventBtn == "btn-boy" && storeAllProducts.notebook.length != 0) {
      const stockNotEmpty = verificationStockOfproduct(
        productId,
        storeRequiredProducts,
        storeAllProducts,
        storeProductEnvoy
      );
      const elementEnsembleProduct = document.querySelector(
        `.displayPcdId${productId}`
      );
      const numberEnsenble = elementEnsembleProduct?.textContent;

      for (
        let indProduEnsenble = 0;
        indProduEnsenble < Number(numberEnsenble);
        indProduEnsenble++
      ) {
        if (page == "car") {
          dispatch(requiredRemoveProducts(productId));
        } else if (stockNotEmpty) {
          dispatch(requiredProducts(productId));
        }
      }

      if (elementEnsembleProduct == null) return;

      elementEnsembleProduct.innerHTML = "1";
    } else if (eventBtn == "btn-favorite") {
      if (Object.values(useSelectorUser).length > 0) {
        if (stateFavoriteProd.indexOf(productId) != -1) {
          dispatch(removeFavoriteProduct(productId));
        } else {
          dispatch(addFavoriteProduct(productId));
        }
        addClassFavorite(productId, true);
      } else {
        redirection(useSelectorUser, url, "nav-element", "currentBar", false);
        dispatch(focusProductRemove());
      }
    }
  };

  const handleRenderProducts = () => {
    let collectionProduct: object[] = [];

    if (page == "car" || page == "envoy" || page == "buy") {
      collectionProduct = stockProducts(objectProducts);
    }

    return objectProducts.map((product: ProductsInfor, index: number) => (
      <li
        onClick={() => dispatch(focusProductAdd(product))}
        key={`key-ProductId${product.id}-${page}-${index}`}
        className={`card-product ${
          collectionProduct.length != 0 &&
          Object(collectionProduct[index])["have"] == 0
            ? "cardRepeatHider"
            : ""
        }`}
      >
        <h3>{product.model}</h3>
        {renderSlide(collectionProduct, index, product, page)}
        {page == "product" && renderInforProduct(product)}
        {page != "car" && page != "favorite" && renderPriceStock(product)}
        {renderButtons({
          product,
          handlefunctionbtn,
          page,
          storeProductEnvoy,
          storeRequiredProducts,
          storeAllProducts,
        })}
      </li>
    ));
  };

  return handleRenderProducts();
};
