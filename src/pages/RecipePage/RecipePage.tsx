import React, { FC } from "react";
import { useLocation } from "react-router-dom";

import cl from "./RecipePage.module.css";

interface Recipe {
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string | undefined;
}

const RecipePage: FC = () => {
  const location = useLocation();

  const recipe = location.state as Recipe;

  if (!recipe) {
    return <div>Загрузка...</div>;
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className={cl.recipe}>
      <div className={cl.recipe_wrapper}>
        <h2 className={cl.recipe_title}>{recipe.strMeal}</h2>
        <div className={cl.options_wrapper}>
          <img
            className={cl.recipe_image}
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />
          <div className={cl.options}>
            <p className={cl.recipe_countrie}>{recipe.strArea}</p>
            <p className={cl.recipe_category}>{recipe.strCategory}</p>
          </div>
        </div>
        <hr className={cl.hr} />

        <div className={cl.ingredients_wrapper}>
          <h2 className={cl.ingredient_title}>Ингредиенты</h2>

          <ul className={cl.ingredients_items}>
            {ingredients.map((item, index) => (
              <li className={cl.ingredients_item} key={index}>
                {item.ingredient} {item.measure}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cl.instruction}>
        <h3 className={cl.instruction_title}>Инструкция</h3>
        <p className={cl.recipe_instruction}>{recipe.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipePage;
