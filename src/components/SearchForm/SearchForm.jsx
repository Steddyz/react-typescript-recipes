import React, { useState } from "react";

import axios from "axios";
import cl from "./SearchForm.module.css";
import Button from "../Button/Button";

const SearchForm = ({ onSearch }) => {
  const [symbol, setSymbol] = useState("");

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    onSearch(symbol);
    setSymbol("");
  };

  return (
    <div>
      <form className={cl.form} onSubmit={handleSearchRecipe}>
        <input
          className={cl.input}
          placeholder="Поиск рецепта"
          onChange={(e) => setSymbol(e.target.value)}
        />
        <Button value={"Поиск"} onClick={handleSearchRecipe} />
      </form>
    </div>
  );
};

export default SearchForm;
