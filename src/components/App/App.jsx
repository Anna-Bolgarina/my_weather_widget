import React, { useState, useEffect } from "react";
import Axios from "axios";
import style from "./style.module.scss";
import SearchForm from "../SearchForm/SearchForm";
import WeatherAddition from "../WeatherAddition/WeatherAddition";
import Weather from "../Weather/Weather";
import WeatherFourDays from "../WeatherFourDays/WeatherFourDays";
import apiKey from "../../apiKey";

function App() {
  const states = ["Сегодня", "5 дней"];

  const [period, setPeriod] = useState(states[0]);
  const [inputState, setInputState] = useState("");
  const [city, setCity] = useState({
    name: "",
    lon: 0,
    lat: 0,
  });
  const [weather, setWeather] = useState([]);
  const [weatherToday, setWeatherToday] = useState({});
  const [fourDaysWeather, setFourDaysWeather] = useState([]);
  const [warning, setWarning] = useState("");

  // находим по введенному названию города его широту и долготу
  const getPositionFromInput = (inputState) => {
    if (inputState !== city.name) {
      const request = Axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputState}&appid=${apiKey}`
      );
      request
        .then((res) => {
          setCity({
            name: res.data[0].local_names.ru,
            lon: res.data[0].lon,
            lat: res.data[0].lat,
          });
          setWarning("");
          setInputState("");
        })
        .catch((error) => {
          setWarning("город не найден");
          setInputState("");
        });
    }
  };

  // функция определения геолокации
  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const request = Axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${apiKey}`
        );
        request.then((res) => {
          setCity({
            name: res.data[0].local_names.ru,
            lon: lon,
            lat: lat,
          });
        });
      });
    } else {
      setWarning("Местоположение неопределено");
    }
  };

  useEffect(() => {
    const getWeather = () => {
      const request = Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&units=metric&lon=${city.lon}&appid=${apiKey}&lang=ru`
      );
      request
        .then((res) => {
          setWeather(res.data.list);
        })
        .catch((error) => alert(`Не удалось определить погоду(${error})`));
    };

    if (city.name === "") {
      return;
    } else {
      getWeather();
    }
  }, [city]);

  useEffect(() => {
    const getCurrentWeather = () => {
      if (city.name !== "") {
        const curDate = Date.now();
        for (let i = 0; i < weather.length - 1; i++) {
          const weatherDt = Date.parse(weather[i].dt_txt);
          const weatherDtNext = Date.parse(weather[i + 1].dt_txt);
          if (curDate >= weatherDt && curDate < weatherDtNext) {
            setWeatherToday(weather[i]);
          }
        }
      }
    };

    const getFourDaysWeather = () => {
      const fourDaysArray = [];
      if (city.name !== "") {
        for (let i = 8; i < weather.length - 1; i += 8) {
          fourDaysArray.push(weather[i]);
          setFourDaysWeather(fourDaysArray);
        }
      }
    };
    getCurrentWeather();
    getFourDaysWeather();
  }, [weather, city]);

  return (
    <div className={style.container}>
      <div className={style.box}>
        <h1 className={style.title}>Прогноз погоды</h1>
        <div className={style.buttons}>
          {states.map((state, index) => {
            return (
              <button
                key={index}
                onClick={() => setPeriod(state)}
                className={period === state ? style.active : ""}>
                {state}
              </button>
            );
          })}
        </div>
        <SearchForm
          inputState={inputState}
          setInputState={setInputState}
          getPositionFromInput={getPositionFromInput}
          setWarning={setWarning}
          warning={warning}
          getCurrentPosition={getCurrentPosition}
        />
        <div className={style.allWeather}>
          <WeatherAddition currentWeather={weatherToday} />
          <div>
            {period === states[0] && (
              <Weather currentWeather={weatherToday} city={city.name} />
            )}
            {period === states[1] && (
              <WeatherFourDays
                currentWeather={weatherToday}
                fourDaysWeather={fourDaysWeather}
                city={city.name}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
