let now = new Date();
let ilestopni;

function formatDate() {
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  let months = [
    "jan",
    "feb",
    "march",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let todaysDate = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let datadzis = document.querySelector("#data-dzisiaj");

  datadzis.innerHTML = `${day} ${month} ${todaysDate}  ${hour}:${minute}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "Forecast";
}
formatDate();
let form = document.querySelector("#search-form");
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let rezultat = document.querySelector("#myText");
  rezultat.innerHTML = searchInput.value;
  console.log(searchInput.value);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

form.addEventListener("submit", search);
form.addEventListener("submit", formatDate);

function convertToCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#celc");
  temp.innerHTML = ilestopni;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempF = (ilestopni * 9) / 5 + 32;
  let tempElement = document.querySelector("#celc");
  tempElement.innerHTML = Math.round(tempF);
}

let celciusLink = document.querySelector("#f-wynik");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#c-wynik");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let apiKey = "105d3bd3eafe9637a2d90b5e0c830daf";

function displayForecast(resopnse) {
  console.log(resopnse.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
            <div class="col-4">
              <p class="weekday">${day}</p>
            </div>
            <div class="col-4">
              <p class="cloud"> <img src="https://images2.minutemediacdn.com/image/fetch/c_fill,g_auto,f_auto,h_560,w_850/https%3A%2F%2Fssl.gstatic.com%2Fonebox%2Fweather%2F64%2Fsunny.png" width="36"></p>
            </div>
            <div class="col-4">
              <p class="temp"><span class="temp-min">-3°C</span>/<span class="temp-max">9°C</span></p>
            </div>
          </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "105d3bd3eafe9637a2d90b5e0c830daf";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showTemperature(response) {
  ilestopni = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#celc");
  let cisnienieElement = document.querySelector("#cisnienie");
  let wiatrElement = document.querySelector("#predkoscwiatru");
  let iconElement = document.querySelector("#icon");
  let warunkiElement = document.querySelector("#warunkiobecne");
  temperatureElement.innerHTML = `${ilestopni}`;
  cisnienieElement.innerHTML = response.data.main.pressure;
  wiatrElement.innerHTML = response.data.wind.speed;
  warunkiElement.innerHTML = response.data.weather[0].description;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
  console.log(response);
}
