import pubsub from "./pubsub";

(function startListeners() {
  const searchBtn = document.querySelector("button.search");
  const city = document.querySelector("input");

  searchBtn.addEventListener("click", async () => {
    if (city.value) {
      pubsub.publish("citySearch", city.value);
    }
  });
})();

function refreshCurrent(data) {
  const city = document.querySelector("h2.location");
  const icon = document.querySelector("img.current");
  const condition = document.querySelector("p.current.condition");
  const temp = document.querySelector("p.current.temp");

  city.textContent = data.location.name;
  icon.setAttribute("src", getIcon(data));
  condition.textContent = data.current.condition.text;
  temp.textContent = `${data.current.temp_c}º C`;
}

function getIcon(data) {
  const imgSrc = data.current.condition.icon;
  const src = imgSrc.slice(imgSrc.lastIndexOf("/"));

  if (data.current.is_day === 1) return `./icons/day${src}`;
  if (data.current.is_day === 0) return `./icons/night${src}`;
}

export { refreshCurrent };
