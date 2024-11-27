import React, { FC, MouseEvent } from "react";

import cl from "./Button.module.css";

interface ButtonProps {
  value: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ value, onClick }) => {
  return (
    <button onClick={onClick} className={cl.button}>
      {value}
    </button>
  );
};

export default Button;
