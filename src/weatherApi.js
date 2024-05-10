const weatherKey = "de8a0865947147c09e3113845242704";

async function getWeather(city) {
  try {
    let src = `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${city}&days=4`;

    const response = await fetch(src, { mode: "cors" });
    if (
      response.status === 400 ||
      response.status === 401 ||
      response.status === 403
    ) {
      console.log(`Error: ${response.statusText}`);
      return;
    }
    const weatherData = await response.json();

    console.log(weatherData);
    lastWeather.set(weatherData);
    return weatherData;
  } catch (err) {
    console.log(err);
  }
}

const lastWeather = {
  weatherData: {},
  set: function (data) {
    this.weatherData = data;
  },
  get: function () {
    return this.weatherData;
  },
};

export { getWeather, lastWeather };
