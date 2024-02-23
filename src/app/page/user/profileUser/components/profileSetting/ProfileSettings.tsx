import { FaGear } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";

import { ToggleClass } from "../../../../../share/modules/addClasses/AddclassElements";
import { deleteCookies } from "../../../../../share/modules/index";

export default function ProfileSettings() {
  const handleDeleteCont = () => {
    localStorage.setItem("autLogin", "false");

    deleteCookies("user", "");
  };

  const handleLogOut = () => {
    localStorage.setItem("autLogin", "false");

    window.location.href = "/";
  };
  return (
    <div className="profileSettings">
      <i onClick={() => ToggleClass(".confings", "hiddersetting")}>
        <FaGear />
      </i>
      <ul className="confings hiddersetting">
        <li onClick={() => handleDeleteCont()}>
          <button type="button">
            <RiDeleteBin6Fill />
            Deletar Conta
          </button>
        </li>
        <li onClick={() => handleLogOut()}>
          <button type="button">
            <RiLogoutBoxFill />
            Desconectar-se
          </button>
        </li>
      </ul>
    </div>
  );
}
