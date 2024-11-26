import React from "react";

import cl from "./Button.module.css";

const Button = ({ value, onClick }) => {
  return (
    <button onClick={onClick} className={cl.button}>
      {value}
    </button>
  );
};

export default Button;
