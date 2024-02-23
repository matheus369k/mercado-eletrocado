import { MdFavorite } from "react-icons/md";

import { useEffect } from "react";

import { appUseSelector } from "../../../../../store/hook";
import { RenderProducts } from "../../../../../share/components/renderCards/RenderProducts";
import { collectProductsOfState } from "../../../../../share/modules/products/transformArray/transformArray";
import { hiddeContainerEmpty } from "../../../../../share/modules/addClasses/AddclassElements";

import "../../../../../styles/card-Products.css";
import "./index.css";
import "./responsive.css";

function Favorite() {
  const storeAllProducts = appUseSelector((state) => state.storeAllProducts);
  const statefavoriteProducts = appUseSelector(
    (state) => state.favoriteProducts
  );

  useEffect(() => {
    hiddeContainerEmpty("#favoritesection", "emptyFav", statefavoriteProducts);

    if (statefavoriteProducts.length != 0)
      localStorage.setItem("favoriteProducts", `${statefavoriteProducts}`);
  }, [statefavoriteProducts]);

  return (
    <div className="favorite">
      <h2>
        Produtos Adicionado Como <MdFavorite />
        Favorios
      </h2>
      {statefavoriteProducts.length == 0 && <p>não há produtos Aqui!!</p>}
      <ul id="favoritesection">
        {RenderProducts(
          collectProductsOfState(storeAllProducts, statefavoriteProducts),
          "favorite"
        )}
      </ul>
    </div>
  );
}

export default Favorite;
