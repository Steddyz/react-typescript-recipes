import axios from "axios";
import React, { FC, useEffect, useState } from "react";

import cl from "./CategoriesPage.module.css";
import { useNavigate } from "react-router-dom";

interface Category {
  strCategory: string;
  idCategory: number;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const CategoriesPage: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };

  useEffect(() => {
    const allCategories = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
      setLoading(false);
    };
    allCategories();
  }, []);
  return (
    <>
      <h1 className={cl.title}>Категории</h1>
      {loading ? (
        <div className={cl.loading}>Загрузка...</div>
      ) : (
        <div className={cl.category}>
          {categories.map((category) => (
            <div
              className={cl.category_wrapper}
              onClick={() => handleCategoryClick(category.strCategory)}
              key={category.idCategory}
            >
              <img
                className={cl.category_image}
                src={category.strCategoryThumb}
                alt={category.strCategoryDescription}
              />
              <p className={cl.category_title}>{category.strCategory}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoriesPage;
