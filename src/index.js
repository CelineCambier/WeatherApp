function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function cityWeather(response) {
  document.querySelector("h3").innerHTML = response.data.name;
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".temp-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} mph`;
}

function searchCity(city) {
  let apiKey = "706e70c8713d5e9b394123591ce6cbc3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityWeather);
}

function searchLocation(position) {
  let apiKey = "706e70c8713d5e9b394123591ce6cbc3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function submitForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#enter-city");
form.addEventListener("submit", submitForm);
searchCity("San Diego");
let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", getCurrentPosition);

/*function changeToFahrenheit(event) {
  event.preventDefault();
 let tempValue = document.querySelector("#temp-value");
 tempValue.innerHTML = 24;
}

function changeToCelsius(event) {
event.preventDefault();
 let tempValue = document.querySelector("#temp-value");
 tempValue.innerHTML = 75;
}*/

// feature 1
let dateElement = document.querySelector("#currentDate");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// feature 2
//let form = document.querySelector("#enter-city");
//form.addEventListener("submit", searchCity);

// bonus feature
/*let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToFahrenheit);

let fahrenheirLink = document.querySelector("#fahrenheit-link");
fahrenheirLink.addEventListener("click", changeToCelsius);*/