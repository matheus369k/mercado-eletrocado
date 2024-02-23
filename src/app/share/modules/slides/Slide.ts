import { addAnimationClass } from "../addClasses/AddclassElements";

export const slideImagens = (elements: string, screen: string) => {
  const elementsHtml = document.querySelectorAll(elements);
  const screenImgs = document.querySelector(screen);

  elementsHtml.forEach((element) => {
    element.addEventListener("click", () => {
      event?.stopPropagation();
      addAnimationClass(".slide", "animation-switch-img", 1000);
      const urlImages = element.children[0].getAttribute("src");

      if (urlImages != null) screenImgs?.setAttribute("src", urlImages);

      event?.currentTarget?.removeEventListener("click", () => element);
    });
  });
};
