import React, { FC } from "react";
import RandomRecipe from "../../components/RandomRecipe/RandomRecipe";
import IngredientsForm from "../../components/IngredientsForm/IngredientsForm";

const MainPage: FC = () => {
  return (
    <>
      <RandomRecipe />
      <IngredientsForm />
    </>
  );
};

export default MainPage;
