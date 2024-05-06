const img = document.querySelector("img");
const button = document.querySelector("button");
const input = document.querySelector("input");
const weatherKey = "de8a0865947147c09e3113845242704";
const googleKey = "AIzaSyCD7FyTqZ7n8sLUT8_xt_vwtijaCruOdNo";

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  autoWeather(lat, long);
});

const autoWeather = async function getWeatherAtCurrentLocation(lat, long) {
  let cityName = await getCity(lat, long);
  getWeather(cityName);
};

async function getWeather(input) {
  let src = `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${input}`;

  const response = await fetch(src, { mode: "cors" });
  const weatherData = await response.json();

  console.log(weatherData);
}

async function getCity(lat, long) {
  let src = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=locality&key=${googleKey}`;

  const response = await fetch(src, { mode: "cors" });
  const cityData = await response.json();

  let cityName = cityData.results[0].address_components[0].long_name;

  return cityName;
}
