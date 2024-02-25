import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { appUseSelector } from "./store/hook";
import { SuccessBuy } from "./page/car/index";
import {
  addFavoriteProduct,
  getAllProducts,
  registerUser,
  requiredProducts,
  updateEnvoyProducts,
} from "./store/redux/productStataSlice";
import {
  getCookies,
  deleteCache,
  getCache,
  stockUpdateState,
} from "./share/modules/index";
import { FetchAxios } from "./store/redux/productStataSlice";

import Footer from "./share/components/footer/Footer";
import Logo from "./share/components/logo/Logo";
import Navbar from "./share/components/navbar/Navbar";
import ProductPage from "./page/productfocus/ProductPage";
import Advertisements from "./share/components/market/Advertisements";
import PagesRoutes from "./routes/PagesRoutes";

import "./styles/App.css";
import { store } from "./store/store";

function App() {
  const [successBuy, setSuccessBuy] = useState<boolean>(false);
  const [checkOutBtn, setCheckOutBtn] = useState<boolean>(false);
  const useSelectoruser = appUseSelector((state) => state.user);
  const statefavoriteProducts = appUseSelector(
    (state) => state.favoriteProducts
  );
  const storeAllProducts = appUseSelector((state) => state.storeAllProducts);
  const stateProductEnvoy = appUseSelector((state) => state.productEnvoy);
  const storeRequiredProducts = appUseSelector(
    (state) => state.requiredProducts
  );
  const useSelectorProduct = appUseSelector((state) => state.product);
  const dispatch = useDispatch();

  console.log(sessionStorage.statusFetchApi);
    
  if (Object.values(useSelectoruser).length == 0 && sessionStorage.statusFetchApi == 'complete') {
    sessionStorage.removeItem("statusFetchApi");
  }

  if (
    sessionStorage.statusFetchApi == undefined &&
    storeAllProducts.notebook.length == 0
  ) {
    store.dispatch(FetchAxios());
    console.log("enter");
  }

  useEffect(() => {
    if (
      document.cookie &&
      Object.values(useSelectoruser).length == 0 &&
      localStorage.autLogin == "true"
    ) {
      dispatch(registerUser(getCookies()));

      dispatch(
        updateEnvoyProducts(getCache("productEnvoy", stateProductEnvoy))
      );

      dispatch(
        requiredProducts(getCache("carProducts", storeRequiredProducts))
      );

      dispatch(
        addFavoriteProduct(getCache("favoriteProducts", statefavoriteProducts))
      );
    } else if (!document.cookie && localStorage.autLogin == "false") {
      deleteCache("favoriteProducts", "productEnvoy", "carProducts");
    }

    if (sessionStorage.statusFetchApi == "complete" && document.cookie) {
      console.log(storeAllProducts, stateProductEnvoy);
      dispatch(
        getAllProducts(stockUpdateState(storeAllProducts, stateProductEnvoy))
      );
    }
  }, [sessionStorage.statusFetchApi]);

  return (
    <Fragment>
      <header className="header">
        <Logo />
        <Navbar />
      </header>
      <aside className="newspaper">
        <Advertisements />
      </aside>
      <main className="main">
        {Object.values(useSelectorProduct).length > 0 ? (
          <ProductPage />
        ) : (
          <PagesRoutes
            checkOutBtn={checkOutBtn}
            setCheckOutBtn={setCheckOutBtn}
            setSuccessBuy={setSuccessBuy}
          />
        )}
      </main>
      <Fragment>
        <Footer />
      </Fragment>
      {successBuy && <SuccessBuy setSuccessBuy={setSuccessBuy} />}
    </Fragment>
  );
}

export default App;
