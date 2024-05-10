import "./style.css";

import { refreshCurrent, refreshForecast } from "./DOMhandler";
import { getWeather, lastWeather } from "./weatherApi";
import { getCity } from "./googleMapApi";

import pubsub from "./pubsub";

pubsub.subscribe("citySearch", async function search(city) {
  let weatherData = await getWeather(city);
  if (weatherData) {
    refreshCurrent(weatherData, tempUnit.get());
    refreshForecast(weatherData.forecast.forecastday, tempUnit.get());
  }
});

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  autoWeather(lat, long);
});

const autoWeather = async function getWeatherAtCurrentLocation(lat, long) {
  let cityName = await getCity(lat, long);
  let weatherData = await getWeather(cityName);
  refreshCurrent(weatherData, tempUnit.get());
  refreshForecast(weatherData.forecast.forecastday, tempUnit.get());
};

const tempUnit = {
  count: 0,
  toggle: function () {
    this.count++;
  },
  get: function () {
    if (this.count % 2 === 0) return "C";
    return "F";
  },
};

pubsub.subscribe("toggleUnit", function toogleTemp() {
  tempUnit.toggle();
  refreshCurrent(lastWeather.get(), tempUnit.get());
  refreshForecast(lastWeather.get().forecast.forecastday, tempUnit.get());
});
