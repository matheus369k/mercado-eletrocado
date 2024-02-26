import { PiShoppingCartFill } from "react-icons/pi";
import { IoStorefrontSharp } from "react-icons/io5";
import { BiSolidUserPlus } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";
import { Fragment, useEffect } from "react";

import {
  AddclassElements,
  ReloadPageAddclassElements,
  AddClassCarNoempty,
  addAnimationClass,
} from "../../modules/addClasses/AddclassElements.ts";
import { appUseSelector } from "../../../store/hook.tsx";

import "./index.css";
import "./responsive.css";

export default function Navbar() {
  const stateRequiredProducts = appUseSelector(
    (state) => state.requiredProducts
  );
  const useSelectoruser = appUseSelector((state) => state.user);

  useEffect(() => {
    AddClassCarNoempty(stateRequiredProducts.length);

    if (stateRequiredProducts.length > 0)
      localStorage.setItem("carProducts", `${stateRequiredProducts}`);
  }, [stateRequiredProducts]);

  useEffect(() => {
    ReloadPageAddclassElements("nav-element", "currentBar");

    addAnimationClass(".animation-register", "animation-navbar-register", 1300);
  }, [useSelectoruser]);

  return (
    <nav className="navbar">
      <ul
        className="animation-register"
        onMouseEnter={() => AddclassElements("nav-element", "currentBar")}
      >
        <li className="nav-element">
          <Link to="/">
            <IoStorefrontSharp />
            Produtos
          </Link>
        </li>
        <li className="nav-element">
          <Link to="/car">
            <PiShoppingCartFill />
            <span id="producCarCount"></span>
            Carrinho
          </Link>
        </li>
        <li className="nav-element">
          <Link to="/user">
            {Object.values(useSelectoruser).length > 0 ? (
              <Fragment>
                <FaCircleUser />
                Perfil
              </Fragment>
            ) : (
              <Fragment>
                {document.cookie ? (
                  <Fragment>
                    <FaUser />
                    Login
                  </Fragment>
                ) : (
                  <Fragment>
                    <BiSolidUserPlus />
                    Registrar-se
                  </Fragment>
                )}
              </Fragment>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
