let currentDate = new Date();
let displayedCurrentDate = document.querySelector("#currentTime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[currentDate.getDay()];

let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = currentDate.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

displayedCurrentDate.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

function search(cityName) {
  let apiKey = "d1bbd379750cfbcbbe5aa91d99dcdec2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUnit = "metric";
  let apiUrl = `${apiEndpoint}?q=${cityName}&units=${apiUnit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#degrees");
  currentTemperature.innerHTML = `${temperature}`;
  document.querySelector("#h5-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#change-city").value;
  search(cityName);
}

let changeCityForm = document.querySelector("#city-form");
changeCityForm.addEventListener("submit", showCity);

function searchLocation(position) {
  let apiKey = "d1bbd379750cfbcbbe5aa91d99dcdec2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUnit = "metric";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&units=${apiUnit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showLocalTemperature(position) {
  let temperature = Math.round(position.data.main.temp);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("New York");
