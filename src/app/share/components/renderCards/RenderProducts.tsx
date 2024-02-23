import { MdFavorite } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { PiShoppingCartFill } from "react-icons/pi";
import { GiConfirmed } from "react-icons/gi";

import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  requiredProducts,
  requiredRemoveProducts,
  addFavoriteProduct,
  removeFavoriteProduct,
  focusProductAdd,
  focusProductRemove,
} from "../../../store/redux/productStataSlice";
import {
  AddclassElements,
  addClassFavorite,
} from "../../modules/addClasses/AddclassElements";
import {
  countBuyProduct,
  stockProducts,
  verificationStockOfproduct,
  redirection,
  productPrice,
  slideImagens,
} from "../../modules/index";
import { appUseSelector } from "../../../store/hook";
import { ProductsInfor } from "../../../@types/types-interfaces";

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
  const url = `${window.location.origin}/#/user`;
  const dispatch = useDispatch();

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
  }, [objectProducts, storeRequiredProducts]);

  const handlefunctionbtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    eventBtn: string,
    productId: number
  ) => {
    e.stopPropagation();

    if (eventBtn == "btn-boy" && Object.values(storeAllProducts).length != 0) {
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

  const renderInforPrice = (limite: number, price: number, id: number) => {
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

        {collectionProduct.length != 0 &&
          Object(collectionProduct[index])["have"] != 0 && (
            <span>X{Object(collectionProduct[index])["have"]}</span>
          )}
        <img
          id={page == "product" ? "Img-main" : ""}
          src={`${product.img}`}
          alt={`${product.model}`}
        />
        {page == "product" && (
          <ul
            className="slide"
            onMouseOver={() =>
              AddclassElements("slide-elements", "currentSlide")
            }
          >
            <li
              onMouseOver={() => slideImagens(".slide-elements", "#Img-main")}
              className="slide-elements"
            >
              <img
                src={`${product.slide.slide2}`}
                alt={`slide-2-${product.model}`}
              />
            </li>
            <li
              onMouseOver={() => slideImagens(".slide-elements", "#Img-main")}
              className="slide-elements currentSlide"
            >
              <img
                src={`${product.slide.slide1}`}
                alt={`slide-1-${product.model}`}
              />
            </li>
            <li
              onMouseOver={() => slideImagens(".slide-elements", "#Img-main")}
              className="slide-elements"
            >
              <img
                src={`${product.slide.slide3}`}
                alt={`slide-3-${product.model}`}
              />
            </li>
          </ul>
        )}

        {page != "car" && page != "favorite" && (
          <div className="priceStock">
            <ul className="price">
              {renderInforPrice(50, product.price, product.id)}
            </ul>

            <span className="stock">
              <FaBox />
              Pcd:{product.stock}
            </span>
          </div>
        )}
        {page == "product" && (
          <ul className="infor-product">
            <li>
              <strong>
                <GiConfirmed />
                Tela:{" "}
              </strong>
              {product.screen}
            </li>

            <li>
              <strong>
                <GiConfirmed />
                Processador:{" "}
              </strong>
              {product.processor}
            </li>

            <li>
              <strong>
                <GiConfirmed />
                Memoria:{" "}
              </strong>
              {product.memory}
            </li>

            {product.placeVideo ? (
              <li>
                <strong>
                  <GiConfirmed />
                  Placa de video:{" "}
                </strong>
                {product.placeVideo}
              </li>
            ) : (
              <li>
                <strong>
                  <GiConfirmed />
                  Bateria:{" "}
                </strong>
                {product.battery}
              </li>
            )}
          </ul>
        )}
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
            title="botão para comprar comprar"
            onClick={(e) => handlefunctionbtn(e, "btn-favorite", product.id)}
            className={`btn-favorite ProductId${product.id}`}
            type="button"
          >
            <MdFavorite />
          </button>
        )}
      </li>
    ));
  };

  return handleRenderProducts();
};
