let apiKey = "05o1cd814date45b8734a5f0a76a9e7d";

function handleWeatherResponse(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconContainer = document.querySelector("#icon-container");

  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let iconUrl = response.data.condition.icon_url;

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed}km/h`;
  iconContainer.innerHTML = `<img src="${iconUrl}" class="weather-icon" alt="${description}" />`;
}
// 2. Search Functionality
function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleWeatherResponse);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

// 3. Date Formatting
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

// 4. Initial Setup and Event Listeners
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

// Load a default city when the page first opens
searchCity("Paris");
