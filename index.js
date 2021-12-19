let now = new Date();

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
  temp.innerHTML = 4;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#celc");
  temp.innerHTML = 23;
}

let celciusLink = document.querySelector("#f-wynik");
celciusLink.addEventListener("click", convertToCelcius);

let fahrenheitLink = document.querySelector("#c-wynik");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let apiKey = "105d3bd3eafe9637a2d90b5e0c830daf";

function showTemperature(response) {
  console.log(response.data);
  let ilestopni = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#celc");
  temperatureElement.innerHTML = `${ilestopni}`;
}
