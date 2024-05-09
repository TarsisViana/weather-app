import pubsub from "./pubsub";

export { refreshCurrent };

function refreshCurrent(data) {
  const city = document.querySelector("h2.location");
  const temp = document.querySelector("p.current.temp");
  const icon = document.querySelector("img.current");

  console.log(data);
  city.textContent = data.location.name;
  temp.textContent = data.current.temp_c;
  console.log(`https:${data.current.condition.icon}`);
  icon.setAttribute("src", `https:${data.current.condition.icon}`);
}

(function startListeners() {
  const searchBtn = document.querySelector("button.search");
  const city = document.querySelector("input");

  searchBtn.addEventListener("click", async () => {
    if (city.value) {
      pubsub.publish("citySearch", city.value);
    }
  });
})();
