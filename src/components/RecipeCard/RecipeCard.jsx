import axios from "axios";
import React, { useEffect, useState } from "react";

import cl from "./RecipeCard.module.css";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ filter }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleRecipeClick = (recipe) => {
    navigate(`/recipes/${recipe.idMeal}`, { state: recipe });
  };

  useEffect(() => {
    const allRecipes = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      setRecipes(response.data.meals);
      setLoading(false);
    };
    allRecipes();
  }, []);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.strMeal &&
      recipe.strMeal.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <div className={cl.loading}>Загрузка...</div>
      ) : (
        <div className={cl.wrapper_recipe}>
          {filteredRecipes.map((recipe) => (
            <div
              onClick={() => handleRecipeClick(recipe)}
              className={cl.recipe_inner}
              key={recipe.idMeal}
            >
              <img
                className={cl.image}
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />
              <div className={cl.recipe_options}>
                <p>{recipe.strMeal}</p>
                <p>{recipe.strArea}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeCard;
