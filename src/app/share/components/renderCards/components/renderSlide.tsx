import { Fragment } from "react";

import { AddclassElements, slideImagens } from "../../../modules";

import { ProductsInfor } from "../../../../@types/types-interfaces";

export const renderSlide = (
  collectionProduct: object[],
  index: number,
  product: ProductsInfor,
  page: string
) => {
  return (
    <Fragment>
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
          onMouseOver={() => AddclassElements("slide-elements", "currentSlide")}
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
    </Fragment>
  );
};
