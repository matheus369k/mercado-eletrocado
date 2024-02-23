import { ReactNode, useEffect } from "react";

import { handleScrollList } from "../../modules/Scrollbar/ScrollBar";
import { ReloadPageAddclassElements } from "../../modules";

import "./button.css";

type PorpsTypes = {
  handleScrollListProps: [string, number, string];
  title: string;
  className: string;
  type: "submit" | "reset" | "button";
  icon: ReactNode;
  stateRedux: number[];
};

export default function Button(propsBtn: PorpsTypes) {
  useEffect(() => {
    const cardshidde = document.querySelectorAll(".cardRepeatHider");
    const objecBtn = document.querySelectorAll(".btnsTopDown");
    ReloadPageAddclassElements("nav-element", "currentBar");

    for (const btn of objecBtn) {
      if (propsBtn.stateRedux.length - cardshidde.length < 2)
        btn.setAttribute("style", "display: none;");
      else btn.setAttribute("style", "display: block;");
    }
  }, []);

  return (
    <button
      title={propsBtn.title}
      className={propsBtn.className}
      onClick={() => handleScrollList(...propsBtn.handleScrollListProps)}
      type={propsBtn.type}
    >
      {propsBtn.icon}
    </button>
  );
}
