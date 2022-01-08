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
console.log("temperatura w celcjuszach?", celciusLink);

let fahrenheitLink = document.querySelector("#c-wynik");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let apiKey = "105d3bd3eafe9637a2d90b5e0c830daf";

function showTemperature(response) {
  console.log(response.data);
  ilestopni = Math.round(response.data.main.temp);
  console.log(ilestopni);
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
}
