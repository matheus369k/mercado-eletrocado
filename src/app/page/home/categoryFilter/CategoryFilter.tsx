import { Dispatch, SetStateAction } from "react";

import { AddclassElements } from "../../../share/modules";

interface Props {
  setCategory: Dispatch<SetStateAction<string>>;
}

export default function CategoryFilter({ setCategory }: Props) {
  return (
    <div
      onMouseMove={() => AddclassElements("btn-category", "active")}
      className="categoryProducts"
      id="category"
    >
      <button
        className="btn-category active"
        type="button"
        onClick={() => setCategory("all")}
      >
        Todos
      </button>
      <button
        className="btn-category"
        type="button"
        onClick={() => setCategory("notebook")}
      >
        Notebook
      </button>
      <button
        className="btn-category"
        type="button"
        onClick={() => setCategory("tablet")}
      >
        Tablet
      </button>
      <button
        className="btn-category"
        type="button"
        onClick={() => setCategory("phone")}
      >
        Celular
      </button>
    </div>
  );
}
