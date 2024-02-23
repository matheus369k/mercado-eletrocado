import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

import { verificationLogin, getCookies } from "../../../share/modules/index";
import { UserData, Login as UserLogin } from "../../../@types/types-interfaces";

import "./login.css";

import Input from "../components/inputs/Input";
import Label from "../components/labels/Label";
import Button from "../components/button/Button";

export const Login = () => {
  const dataLogin: UserLogin = { email: "", password: "" };
  const cookiesUser: UserData = getCookies();

  const handleForgetPassword = () => {
    event?.preventDefault();
    event?.stopPropagation();
    
    document.getElementById('email')?.setAttribute('value', cookiesUser.email)
    collectDataLogin(cookiesUser.email, 'email');
    document.getElementById('password')?.setAttribute('value', cookiesUser.password)
    collectDataLogin(cookiesUser.password, 'password');
  }

  const collectDataLogin = (data: string, location: string) => {
    document.querySelector(".error")?.classList.remove("error");

    if (location == "email") dataLogin.email = data;
    else dataLogin.password = data;
  };

  return (
    <div className="containerLogin">
      <h2 className="title">
        <FaUser />
        Login
      </h2>
      <form method="POST" className="login">
        <Label htmlFor="email" icon={<MdOutlineEmail />} text={"Email"} />
        <Input
          handleOnChange={(e) => collectDataLogin(e.target.value, "email")}
          type="email"
          name="email"
          id="email"
          placeHolder="Insira seu email..."
          title="E-mail"
        />
        <Label htmlFor="password" icon={<IoKeyOutline />} text={"Senha"} />
        <Input
          handleOnChange={(e) => collectDataLogin(e.target.value, "password")}
          type="password"
          name="password"
          id="password"
          placeHolder="Insira sua senha..."
          title="senha"
        />
        <a
          onClick={()=>handleForgetPassword()}
          className="forgetPassword"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Esqueceu a Senha?
        </a>
        <Button
          handleOnClick={() => verificationLogin(dataLogin, cookiesUser)}
          type="submit"
          className="btnSubmit"
          text="Login"
        />
      </form>
    </div>
  );
};
