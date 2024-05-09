const weatherKey = "de8a0865947147c09e3113845242704";

async function getWeather(city) {
  let src = `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city}`;

  const response = await fetch(src, { mode: "cors" });
  const weatherData = await response.json();

  console.log(weatherData);
  return weatherData;
}

export { getWeather };
