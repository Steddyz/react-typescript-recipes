import React, { FC, useState } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

const RecipesPage: FC = () => {
  const [filter, setFilter] = useState<string>("");

  const handleSearch = (symbol: string) => {
    setFilter(symbol);
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <RecipeCard filter={filter} />
    </>
  );
};

export default RecipesPage;
