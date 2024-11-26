import React, { FC, useEffect, useState, ChangeEvent } from "react";

import cl from "./IngredientsForm.module.css";
import axios from "axios";

interface Recipe {
  idMeal: number;
  strMealThumb: string;
  strMeal: string;
  strArea: string;
}

const IngredientsForm: FC = () => {
  const [searchIngred, setSearchIngred] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (searchIngred.trim() !== "") {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchIngred.replace(
            / /g,
            "_"
          )}`
        );
        if (response.data.meals) {
          setRecipes(response.data.meals);
        } else {
          setRecipes([]);
        }
      } else {
        setRecipes([]);
      }
    };
    fetchRecipe();
  }, [searchIngred]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchIngred(e.target.value);
  };

  return (
    <div className={cl.ingredients_title}>
      <h1 className={cl.title}>Поиск по ингредиентам</h1>
      <hr />
      <form className={cl.ingredients_form}>
        <div className={cl.form_group}>
          <label className={cl.form_label}>Желаемые ингредиенты </label>
          <input
            className={cl.form_input}
            placeholder="Введите желаемые ингредиенты"
            onChange={handleSearch}
          />
        </div>
        <div className={cl.recipes_wrapper}>
          {recipes.length > 0 ? (
            <div className={cl.recipes_inner}>
              {recipes.map((recipe) => (
                <div className={cl.recipes_item} key={recipe.idMeal}>
                  <img
                    className={cl.image}
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />
                  <p>{recipe.strMeal}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={cl.description_Wrapper}>
              <p className={cl.description}>No results</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default IngredientsForm;
