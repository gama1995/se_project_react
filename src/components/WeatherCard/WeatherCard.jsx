import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";


function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}
      °{currentTemperatureUnit}
      </p>
      <img
        src={weatherData.imageUrl}
        alt={`Weather card showing ${weatherData.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard; 


