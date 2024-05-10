import pubsub from "./pubsub";
import { format } from "date-fns";

(function startListeners() {
  const searchBtn = document.querySelector("button.search");
  const city = document.querySelector("input");
  const unitBtn = document.querySelector("button.unit");

  searchBtn.addEventListener("click", async () => {
    if (city.value) {
      pubsub.publish("citySearch", city.value);
    }
  });

  unitBtn.addEventListener("click", () => {
    pubsub.publish("toggleUnit");
  });
})();

function refreshCurrent(data, unit) {
  const city = document.querySelector("h2.location");
  const icon = document.querySelector("img.current");
  const condition = document.querySelector("p.current.condition");
  const temp = document.querySelector("p.current.temp");

  city.textContent = data.location.name;
  icon.setAttribute("src", getIcon(data.current));
  condition.textContent = data.current.condition.text;
  if (unit === "C") temp.textContent = `${data.current.temp_c}º C`;
  else if (unit === "F") temp.textContent = `${data.current.temp_f}º F`;
}

function getIcon(data) {
  const imgSrc = data.condition.icon;
  const src = imgSrc.slice(imgSrc.lastIndexOf("/"));

  if (!data.is_day) return `./icons/day${src}`;
  if (data.is_day === 1) return `./icons/day${src}`;
  if (data.is_day === 0) return `./icons/night${src}`;
}

function refreshForecast(data, unit) {
  const wrapper = document.querySelector("div.forecast.wrapper");
  wrapper.innerHTML = "";

  for (let i = 1; i < data.length; i++) {
    const forecastDiv = document.createElement("div");
    const day = document.createElement("p");
    const icon = document.createElement("img");
    const condition = document.createElement("p");
    const maxTemp = document.createElement("p");
    const minTemp = document.createElement("p");

    forecastDiv.className = `forecast day${i}`;
    day.className = `forecast day${i} weekDay`;
    icon.className = `forecast day${i} condition-img`;
    condition.className = `forecast day${i} condition-text`;
    maxTemp.className = `forecast day${i} max-temp`;
    minTemp.className = `forecast day${i} min-temp`;

    day.textContent = format(new Date(data[i].date), "EEEE");
    icon.setAttribute("src", getIcon(data[i].day));
    condition.textContent = data[i].day.condition.text;
    if (unit === "C") {
      maxTemp.textContent = `${data[i].day.maxtemp_c}º C`;
      minTemp.textContent = `${data[i].day.mintemp_c}º C`;
    } else if (unit === "F") {
      maxTemp.textContent = `${data[i].day.maxtemp_f}º F`;
      minTemp.textContent = `${data[i].day.mintemp_f}º F`;
    }

    forecastDiv.appendChild(day);
    forecastDiv.appendChild(icon);
    forecastDiv.appendChild(condition);
    forecastDiv.appendChild(maxTemp);
    forecastDiv.appendChild(minTemp);

    wrapper.appendChild(forecastDiv);
  }
}

export { refreshCurrent, refreshForecast };
