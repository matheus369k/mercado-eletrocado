import { ReloadPageAddclassElements } from "../addClasses/AddclassElements";

export const redirection = (
  user: object,
  url: string,
  classElements: string,
  addClass: string,
  action: boolean
) => {
  if (Object.values(user).length == 0 || action == true) {
    window.location.assign(url);

    ReloadPageAddclassElements(classElements, addClass);
  }
};
