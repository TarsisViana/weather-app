import "./style.css";
import { refreshCurrent } from "./DOMhandler";
import pubsub from "./pubsub";

const weatherKey = "de8a0865947147c09e3113845242704";
const googleKey = "AIzaSyCD7FyTqZ7n8sLUT8_xt_vwtijaCruOdNo";
const searchBtn = document.querySelector("button.search");

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

async function getWeather(city) {
  let src = `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city}`;

  const response = await fetch(src, { mode: "cors" });
  const weatherData = await response.json();

  console.log(weatherData);
  return weatherData;
}

async function getCity(lat, long) {
  let src = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=locality&key=${googleKey}`;

  const response = await fetch(src, { mode: "cors" });
  const cityData = await response.json();

  let cityName = cityData.results[0].address_components[0].long_name;

  return cityName;
}
