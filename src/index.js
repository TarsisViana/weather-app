import "./style.css";

import { refreshCurrent } from "./DOMhandler";
import { getWeather } from "./weatherApi";
import { getCity } from "./googleMapApi";

import pubsub from "./pubsub";

pubsub.subscribe("citySearch", async function search(city) {
  let weatherData = await getWeather(city);
  refreshCurrent(weatherData);
});

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  autoWeather(lat, long);
});

const autoWeather = async function getWeatherAtCurrentLocation(lat, long) {
  let cityName = await getCity(lat, long);
  let weatherData = await getWeather(cityName);
  refreshCurrent(weatherData);
};
