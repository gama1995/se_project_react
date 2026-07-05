import clearDay from "../assets/day/clear.png";
import cloudyDay from "../assets/day/cloudy.svg";
import defaultDay from "../assets/day/default.svg";
import clearNight from "../assets/night/clear.svg";
import cloudyNight from "../assets/night/cloudy.svg";
import defaultNight from "../assets/night/default.svg";

const weatherOptions = [
  { condition: "clear", isDay: true, url: clearDay },
  { condition: "clouds", isDay: true, url: cloudyDay },
  { condition: "default", isDay: true, url: defaultDay },
  { condition: "clear", isDay: false, url: clearNight },
  { condition: "clouds", isDay: false, url: cloudyNight },
  { condition: "default", isDay: false, url: defaultNight },
];

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};

export const filterWeatherData = (data) => {
  const condition = data.weather[0].main.toLowerCase();
  const isDayTime = isDay(data.sys, Date.now());
  const weatherOption = weatherOptions.find(
    (option) => option.condition === condition && option.isDay === isDayTime,
  );
  const defaultWeatherOption = weatherOptions.find(
    (option) => option.condition === "default" && option.isDay === isDayTime,
  );

  const tempF = Math.round(data.main.temp);

  return {
    city: data.name,
    temp: {
      F: tempF,
      C: Math.round(((tempF - 32) * 5) / 9),
    },
    type: getWeatherType(tempF),
    condition,
    isDay: isDayTime,
    imageUrl: weatherOption?.url || defaultWeatherOption.url,
  };
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  }
  if (temperature >= 66 && temperature < 86) {
    return "warm";
  }
  return "cold";
};
