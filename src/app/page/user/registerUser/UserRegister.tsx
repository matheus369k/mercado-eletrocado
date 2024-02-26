import { GoPeople } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";

import { useDispatch } from "react-redux";

import { registerUser } from "../../../store/redux/productStataSlice";
import { addAnimationClass } from "../../../share/modules/addClasses/AddclassElements";
import { ValidationDateUser, setCookies } from "../../../share/modules";

import Label from "../components/labels/Label";
import Input from "../components/inputs/Input";
import Button from "../components/button/Button";

import "./index.css";
import "./responsive.css";

interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
  cep: string;
}

export const UserRegister = () => {
  const dispatch = useDispatch();

  const user: User = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    cep: "",
  };

  const CollectDataUser = (inputsValue: string, key: string) => {
    document.querySelector(".error")?.classList.remove("error");

    for (let i = 0; i < 5; i++) {
      if (key == "name") user.name = inputsValue;

      if (key == "lastName") user.lastName = inputsValue;

      if (key == "email") user.email = inputsValue;

      if (key == "password") user.password = inputsValue;

      if (key == "cep") user.cep = inputsValue;
    }
  };

  const ConfirmData = () => {
    const validationStatus = ValidationDateUser(user);

    if (validationStatus) {
      setTimeout(() => {
        dispatch(registerUser(user));
      }, 1000);

      const convertionToJson = JSON.stringify(user);

      if (!document.cookie) setCookies("user", convertionToJson);

      addAnimationClass(
        ".animation-register",
        "animation-navbar-register",
        1300
      );

      localStorage.setItem("autLogin", "true");
    }
  };

  return (
    <div className="register">
      <h2>
        <FaUserPlus />
        Cadratar-se
      </h2>
      <form autoComplete="off"  method="post" className="registerform">
        <Label htmlFor="name" icon={<GoPeople />} text={"Nome"} />
        <Input
          handleOnChange={(e) => CollectDataUser(e.target.value, "name")}
          type="text"
          name="name"
          id="name"
          title="Nome"
          placeHolder="Osvaldo"
          maxLength={30}
        />
        <Label htmlFor="sobrenome" icon={<GoPeople />} text={"Sobrenome"} />
        <Input
          handleOnChange={(e) => CollectDataUser(e.target.value, "lastName")}
          type="text"
          name="lastName"
          title="Sobrenome"
          maxLength={30}
          id="lastName"
          placeHolder="Silva"
        />
        <Label htmlFor="email" icon={<MdOutlineEmail />} text={"E-mail"} />
        <Input
          handleOnChange={(e) => CollectDataUser(e.target.value, "email")}
          type="email"
          name="email"
          id="email"
          title="E-Mail"
          maxLength={50}
          placeHolder="xxxxxxx@email.com"
        />
        <Label htmlFor="password" icon={<IoKeyOutline />} text={"Senha"} />
        <Input
          handleOnChange={(e) => CollectDataUser(e.target.value, "password")}
          type="password"
          name="password"
          title="Senha"
          id="password"
          maxLength={16}
          placeHolder="xxxxxxxx"
        />
        <Label htmlFor="cep" icon={<MdOutlinePlace />} text={"CEP"} />
        <Input
          handleOnChange={(e) => CollectDataUser(e.target.value, "cep")}
          type="text"
          name="cep"
          id="cep"
          title="CEP"
          maxLength={9}
          placeHolder="xxxxx-xxx"
        />
        <Button
          handleOnClick={() => ConfirmData()}
          type="button"
          id="Confirmar"
          className="btnSubmit"
          text="Confirmar"
        />
      </form>
    </div>
  );
};
