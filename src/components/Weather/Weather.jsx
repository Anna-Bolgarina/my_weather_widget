import { formatDate } from "../../date/date";
import style from "./style.module.scss";

function Weather({ currentWeather, city }) {
  const temp = Object.keys(currentWeather).length
    ? Math.round(currentWeather.main.temp)
    : "";
  const date = formatDate();

  return Object.keys(currentWeather).length ? (
    <div className={style.weather}>
      <div className={style.weather__temp}>{temp}&#176;</div>
      <div className={style.weather__info}>
        <div className={style.weather__city}>{city}</div>
        <div>{date}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Weather;
