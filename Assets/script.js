const apiKey = '158354e21643f190d97f40ced0e5e64a';
const searchFormEl = document.querySelector('#search-form')

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const { coord } = data;
            getForecast(coord.lat, coord.lon);
            displayCurrentWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// function getForecast(lat, lon) {
//     const apiUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             displayForecast(data);
//         })
//         .catch(error => console.error('Error fetching forecast data:', error));
// }

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    currentWeatherDiv.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    forecastList.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        forecastDiv.innerHTML += `
            <div class="weather-card">
                <h3>${date}</h3>
                <p>Temp: ${item.main.temp}°C</p>
                <p>Humidity: ${item.main.humidity}%</p>
            </div>
        `;
    });
}
