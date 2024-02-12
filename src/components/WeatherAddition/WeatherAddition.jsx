import style from "./style.module.scss";

function WeatherAddition({ currentWeather }) {
  const imgUrl = Object.keys(currentWeather).length
    ? `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
    : "";
  const cloudy = Object.keys(currentWeather).length
    ? `${currentWeather.weather[0].description}`
    : "";
  const humidity = Object.keys(currentWeather).length
    ? `Влажность: ${currentWeather.main.humidity}%`
    : "";
  const wind = Object.keys(currentWeather).length
    ? `Ветер: ${Math.round(currentWeather.wind.speed)}км/ч`
    : "";
  return (
    <>
      <div className={style.additionalList}>
        <div>
          <img className={style.additionalList__img} src={imgUrl} alt="" />
          <p className={style.additionalList__cloudy}>{cloudy}</p>
        </div>
        <div>
          <p>{humidity}</p>
          <p>{wind}</p>
        </div>
      </div>
    </>
  );
}

export default WeatherAddition;
