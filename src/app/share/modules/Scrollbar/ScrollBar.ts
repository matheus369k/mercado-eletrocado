export const handleScrollList = (
  localScollbar: string,
  incremment: number,
  elementLeave?: string
) => {
  const elementScroll: HTMLElement | null = document.querySelector(
    `${localScollbar}`
  );
  const elementExit: NodeListOf<Element> | null = document.querySelectorAll(
    `${elementLeave}`
  );

  if (elementScroll == null || elementExit == null) return;

  const elementheight: number = elementScroll.offsetTop;
  let calcIncremnt: number = elementheight + incremment;

  if (calcIncremnt > 0) calcIncremnt = 0;

  incremment = incremment < 0 ? -incremment : incremment;

  if (
    calcIncremnt <=
    -(elementScroll.children.length - elementExit?.length - 1) * incremment
  ) {
    calcIncremnt =
      -(elementScroll.children.length - elementExit?.length - 2) * incremment;
  }

  elementScroll.setAttribute("style", `top:${calcIncremnt}px;`);
};
