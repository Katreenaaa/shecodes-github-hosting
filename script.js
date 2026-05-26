function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");

  let city = searchInputElement.value;
  cityElement.innerHTML = city;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleWeatherResponse);
}

function handleWeatherResponse(response) {
  let currentTemperature = response.data.temperature.current;
  let currentIconUrl = response.data.condition.icon_url;
  let roundedTemperature = Math.round(currentTemperature);
  let city = response.data.city;

  let iconElement = document.querySelector(".current-temperature-icon");
  let valueElement = document.querySelector(".current-temperature-value");
  let headingElement = document.querySelector("#current-city");

  valueElement.innerHTML = roundedTemperature;

  iconElement.innerHTML = `<img src="${currentIconUrl}" class="weather-icon" alt="weather-icon" />`;

  headingElement.innerHTML = city;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

let initialUrl = `https://api.shecodes.io/weather/v1/current?query=Sydney&key=${apiKey}&units=metric`;
axios.get(initialUrl).then(handleWeatherResponse);
