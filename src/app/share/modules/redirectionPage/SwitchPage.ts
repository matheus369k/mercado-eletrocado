import { ReloadPageAddclassElements } from "../addClasses/AddclassElements";

export const redirection = (
  url: string,
  classElements: string,
  addClass: string
) => {
  window.location.assign(url);

  ReloadPageAddclassElements(classElements, addClass);
};
