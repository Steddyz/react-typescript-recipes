import axios from "axios";
import React, { FC, useEffect, useState } from "react";

import American from "../../assets/flags/American.png";
import British from "../../assets/flags/British.png";
import Canadian from "../../assets/flags/Canadian.png";
import Chinese from "../../assets/flags/Chinese.png";
import Croatian from "../../assets/flags/Croatian.png";
import Dutch from "../../assets/flags/Dutch.png";
import Egyptian from "../../assets/flags/Egyptian.png";
import Filipino from "../../assets/flags/Filipino.png";
import French from "../../assets/flags/French.png";
import Greek from "../../assets/flags/Greek.png";
import Indian from "../../assets/flags/Indian.png";
import Irish from "../../assets/flags/Irish.png";
import Italian from "../../assets/flags/Italian.png";
import Jamaican from "../../assets/flags/Jamaican.png";
import Japanese from "../../assets/flags/Japanese.png";
import Kenyan from "../../assets/flags/Kenyan.png";
import Malaysian from "../../assets/flags/Malaysian.png";
import Mexican from "../../assets/flags/Mexican.png";
import Moroccan from "../../assets/flags/Moroccan.png";
import Polish from "../../assets/flags/Polish.png";
import Portuguese from "../../assets/flags/Portuguese.png";
import Russian from "../../assets/flags/Russian.png";
import Spanish from "../../assets/flags/Spanish.png";
import Thai from "../../assets/flags/Thai.png";
import Tunisian from "../../assets/flags/Tunisian.png";
import Turkish from "../../assets/flags/Turkish.png";
import Ukrainian from "../../assets/flags/Ukrainian.png";
import Vietnamese from "../../assets/flags/Vietnamese.png";
import Unknown from "../../assets/flags/Unknown.png";

import cl from "./CountriePage.module.css";
import { useNavigate } from "react-router-dom";

interface Country {
  strArea: string;
}

const CountriePage: FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const flagMap: { [key: string]: string } = {
    American: American,
    British: British,
    Canadian: Canadian,
    Chinese: Chinese,
    Croatian: Croatian,
    Dutch: Dutch,
    Egyptian: Egyptian,
    Filipino: Filipino,
    French: French,
    Greek: Greek,
    Indian: Indian,
    Irish: Irish,
    Italian: Italian,
    Jamaican: Jamaican,
    Japanese: Japanese,
    Kenyan: Kenyan,
    Malaysian: Malaysian,
    Mexican: Mexican,
    Moroccan: Moroccan,
    Polish: Polish,
    Portuguese: Portuguese,
    Russian: Russian,
    Spanish: Spanish,
    Thai: Thai,
    Tunisian: Tunisian,
    Turkish: Turkish,
    Ukrainian: Ukrainian,
    Vietnamese: Vietnamese,
  };

  const navigator = useNavigate();

  const handleCountrieClick = (countrieName: string) => {
    navigator(`/countries/${countrieName}`);
  };

  useEffect(() => {
    const allCountries = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      setCountries(response.data.meals);
      setLoading(false);
    };
    allCountries();
  }, []);

  return (
    <>
      <h1 className={cl.title}>Национальные блюда</h1>
      {loading ? (
        <div className={cl.loading}>Загрузка...</div>
      ) : (
        <div className={cl.countrie}>
          {countries.map((countrie, index) => (
            <div
              key={index}
              className={cl.countrie_wrapper}
              onClick={() => handleCountrieClick(countrie.strArea)}
            >
              <img
                src={flagMap[countrie.strArea] || Unknown}
                alt={countrie.strArea}
                className={cl.flag_image}
              />
              <p className={cl.countrie_name}>{countrie.strArea}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CountriePage;
