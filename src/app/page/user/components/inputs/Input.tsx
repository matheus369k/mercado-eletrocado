import React, { HTMLInputTypeAttribute } from "react";

import "./input.css";

type InputProps = {
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
  name: string;
  id: string;
  placeHolder: string;
  title: string;
  maxLength?: number;
};

export default function Input(inputProps: InputProps) {
  return (
    <input
      autoComplete="off"
      onChange={inputProps.handleOnChange}
      type={inputProps.type}
      name={inputProps.name}
      id={inputProps.id}
      placeholder={inputProps.placeHolder}
      title={inputProps.title}
      maxLength={inputProps.maxLength}
    />
  );
}
