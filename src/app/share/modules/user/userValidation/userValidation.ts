import { Login, UserData } from "../../../../@types/types-interfaces";

export const ValidationDateUser = (userData: UserData) => {
  try {
    const cepSplit: string[] = userData["cep"].split("-");

    if (userData["name"].length < 3) throw new Error("name invalido!!");

    if (userData["lastName"].length < 3) throw new Error("lastName invalido!!");

    if (
      !userData["email"]?.includes("@") ||
      userData["email"].slice(
        userData["email"].length - 4,
        userData["email"].length
      ) != ".com"
    )
      throw new Error("email invalido!!");

    if (userData["password"].length < 8) throw new Error("password invalida!!");

    if (userData["cep"].indexOf("-") != 5) throw new Error("cep invalido!!");

    if (!Number(cepSplit[0]) || (!Number(cepSplit[1]) && cepSplit[1] != "000"))
      throw new Error("cep Invalido!!");

    window.history.back();

    return true;
  } catch (error: unknown) {
    const Erro = (error as TypeError).message;

    const local = Erro.split(" ")[0];

    document.getElementById(`${local}`)?.classList.add("error");

    console.log(Erro);

    return false;
  }
};

export const verificationLogin = (loginData: Login, userData: UserData) => {
  try {
    event?.preventDefault();
    const url = `${window.location.origin}/mercado-eletrocado/`;
    if (loginData.email != userData.email) throw new Error("email invalido");

    if (loginData.password != userData.password)
      throw new Error("password invalido");

    localStorage.setItem("autLogin", "true");

    window.location.assign(url);
  } catch (error: unknown) {
    const Erro = (error as TypeError).message;

    const local = Erro.split(" ")[0];

    document.getElementById(`${local}`)?.classList.add("error");

    console.log(Erro);
  }
};
