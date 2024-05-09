const googleKey = "AIzaSyCD7FyTqZ7n8sLUT8_xt_vwtijaCruOdNo";

async function getCity(lat, long) {
  let src = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=locality&key=${googleKey}`;

  const response = await fetch(src, { mode: "cors" });
  const cityData = await response.json();

  let cityName = cityData.results[0].address_components[0].long_name;

  return cityName;
}

export { getCity };
