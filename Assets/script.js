const apiKey = "158354e21643f190d97f40ced0e5e64a";
const searchFormEl = document.querySelector("#search-form");
const city = "london";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
const weatherCard = document.querySelector("#forecast.weather-card");

document.getElementById("search-button").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  getWeather(city);
});

function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchInputVal = document.querySelector("#search-input").value;
  const formatInputVal = document.querySelector("#format-input").value;
  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }
  const queryString = `./Develop/index.html?q=${searchInputVal}&format=${formatInputVal}`;
  location.assign(queryString);
}
searchFormEl.addEventListener("submit", handleSearchFormSubmit);
function getWeather(city) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      getForecast(city);
      displayCurrentWeather(data);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function getForecast(city) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayForecast(data);
    })
    .catch((error) => console.error("Error fetching forecast data:", error));
}

function displayCurrentWeather(data) {
  const currentWeatherDiv = document.getElementById("current-weather");
  currentWeatherDiv.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
    `;
}

function displayForecast(data) {
  if (!data || !data.list) {
    console.error("Invalid data structure:", data);
    return;
  }

  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "<h2>5-Day Forecast</h2>";

  // Filter for entries at 12:00:00 each day
  const forecastList = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  forecastList.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    const temp = item.main.temp;
    const humidity = item.main.humidity;
    const description = item.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    // Weather Card 
    const weatherCard = `
            <div class="weather-card">
                <h3>${date}</h3>
                <img src="${icon}" alt="${description}">
                <p>Temp: ${temp}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>${description}</p>
            </div>
        `;
    forecastDiv.innerHTML += weatherCard;
  });
}
// function displayForecast(data) {
// }
