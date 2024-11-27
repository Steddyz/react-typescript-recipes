import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import cl from "./MealsByCountry.module.css";
import SearchForm from "../SearchForm/SearchForm";

interface CountrieMeal {
  idMeal: number;
  strMealThumb: string;
  strMeal: string;
}

interface Params {
  countrieName: string;
  [key: string]: string | undefined;
}

const MealsByCountry: FC = () => {
  const { countrieName } = useParams<Params>();
  const [meals, setMeals] = useState<CountrieMeal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMeal, setSelectedMeal] = useState<CountrieMeal | null>(null);
  const [filter, setFilter] = useState<string>("");

  const navigate = useNavigate();

  const handleSearch = (symbol: string) => {
    setFilter(symbol.trim());
  };

  const handleRecipeClick = async (meal: CountrieMeal) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.strMeal}`
      );
      setSelectedMeal(response.data.meals[0]);
      navigate(`/recipes/${meal.idMeal}`, { state: response.data.meals[0] });
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  useEffect(() => {
    const mealsByCountrie = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countrieName}`
      );
      setLoading(false);
      setMeals(response.data.meals || []);
    };
    mealsByCountrie();
  }, [countrieName]);

  const filteredMeals = meals.filter((meal: CountrieMeal) =>
    meal.strMeal.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h2 className={cl.title}>Блюда из {countrieName}</h2>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <div className={cl.loading}>Loading...</div>
      ) : (
        <div className={cl.wrapper_countrie}>
          {filteredMeals.map((meal) => (
            <div
              onClick={() => handleRecipeClick(meal)}
              className={cl.countrie_inner}
              key={meal.idMeal}
            >
              <img
                className={cl.image}
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <p className={cl.description}>{meal.strMeal}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MealsByCountry;
