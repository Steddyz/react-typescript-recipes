import React, { FC, FormEvent, useState, MouseEvent } from "react";

import cl from "./SearchForm.module.css";
import Button from "../Button/Button";

interface handleSearch {
  onSearch: (symbol: string) => void;
}

const SearchForm: FC<handleSearch> = ({ onSearch }) => {
  const [symbol, setSymbol] = useState<string>("");

  const handleSearchRecipe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(symbol);
    setSymbol("");
  };

  const handleSearchRecipeClick = (e: MouseEvent<HTMLButtonElement>) => {
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
        <Button value={"Поиск"} onClick={handleSearchRecipeClick} />
      </form>
    </div>
  );
};

export default SearchForm;
