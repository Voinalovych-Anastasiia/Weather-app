function updateDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let today = document.querySelector(".day");
  today.innerHTML = `${day} ${date}`;

  let hour = document.querySelector(".hour");
  hour.innerHTML = `${hours}:${minutes}`;
}

updateDate();

let apiKey = "7e4d33361f2ae1188d23e9af28a43e43";
let cityName = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

function showWeather(response) {
  let tempElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temperature}`;

  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}`;

  let windSpeedElement = document.querySelector(".windSpeed");
  let windSpeed = 3.6 * response.data.wind.speed;
  windSpeed = windSpeed.toFixed(1);
  windSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;

  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `${response.data.weather[0].main}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

axios.get(apiUrl).then(showWeather);

function showCurrentWeather(response) {
  let positionNameElement = document.querySelector("h1");
  positionNameElement.innerHTML = `${response.data.name}`;

  let tempElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temperature}`;

  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}`;

  let windSpeedElement = document.querySelector(".windSpeed");
  let windSpeed = 3.6 * response.data.wind.speed;
  windSpeed = windSpeed.toFixed(1);
  windSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;

  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `${response.data.weather[0].main}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

let locationButton = document.querySelector(".currentWeatherButton");
locationButton.addEventListener("click", getLocation);

function showSearchWeather(response) {
  let tempElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temperature}`;

  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}`;

  let windSpeedElement = document.querySelector(".windSpeed");
  let windSpeed = 3.6 * response.data.wind.speed;
  windSpeed = windSpeed.toFixed(1);
  windSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;

  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = `${response.data.weather[0].main}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchWeather(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let city = document.querySelector("h1");
  city.innerHTML = `${searchCity.value}`;
  city = `${searchCity.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchWeather);
