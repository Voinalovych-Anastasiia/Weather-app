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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  
                <div class="col-2">
                    <div class="weather-forecast-date">${day}</div> <img src="http://openweathermap.org/img/wn/10d@2x.png"
                        alt="" />
                    <div class="weather-forecast-temp">
                        <span class="forecast-temp-max">18°</span>
                        <span class="forecast-temp-min">12°</span>
                    </div>
                </div>            
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

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
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  celTemp = response.data.main.temp;
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
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  celTemp = response.data.main.temp;
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
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  celTemp = response.data.main.temp;
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

function convertToFah(event) {
  event.preventDefault();
  let fahTemp = (celTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahTemp);
  celLink.classList.remove("active");
  fahLink.classList.add("active");
}

function convertToCel(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celTemp);
  celLink.classList.add("active");
  fahLink.classList.remove("active");
}

let celTemp = null;

let fahLink = document.querySelector("#fah-link");
fahLink.addEventListener("click", convertToFah);

let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", convertToCel);
