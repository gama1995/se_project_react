import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const weatherOption =
    weatherOptions.find((option) => {
      return (
        option.day === weatherData.isDay &&
        option.condition === weatherData.condition
      );
    }) || defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

    console.log(weatherData);
    console.log(weatherOption);

  const timeOfDay = weatherData.isDay ? "daytime" : "nighttime";
  const condition = weatherData.condition || "default";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}° F</p>
      <img
        src={weatherOption?.url}
        alt={`Weather card showing ${timeOfDay} ${condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
