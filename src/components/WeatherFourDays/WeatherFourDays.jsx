import { formatDate, formatAfterDate } from "../../date/date";
import style from "./style.module.scss";

function WeatherFourDays({ currentWeather, fourDaysWeather, city }) {
  const temp = Object.keys(currentWeather).length
    ? Math.round(currentWeather.main.temp)
    : "";
  const date = formatDate();
  return (
    <div className={style.daysWeather}>
      <div className={style.daysWeather__city}>{city}</div>
      <div className={style.daysWeather__list}>
        {Object.keys(currentWeather).length ? (
          <div>
            <div className={style.daysWeather__list__date}>{date}</div>
            <div className={style.daysWeather__list__temp}>{temp}&#176;</div>
          </div>
        ) : (
          ""
        )}

        {fourDaysWeather.map((obj, index) => {
          return (
            <div key={index} className={style.daysWeather__list__fourDays}>
              <div>{formatAfterDate(obj.dt)}</div>
              <div className={style.daysWeather__list__fourDays_temp}>
                {Math.round(obj.main.temp)}&#176;
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherFourDays;
