let tempElement = document.querySelector("#temperature");
let iconElement = document.querySelector("#weather-icon");
let timeElement = document.querySelector("#time");
let cityElement = document.querySelector("#city");
let sunriseElement = document.querySelector("#sunrise");
let sunsetElement = document.querySelector("#sunset");
let humidityElement = document.querySelector("#weather-humidity");
let windElement = document.querySelector("#weather-wind");
let descriptionElement = document.querySelector("#weather-description");
let farenheitLink = document.querySelector("#farenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let formElement = document.querySelector("#search-form");
let forecastElement = document.querySelector("#forecast");

formElement.addEventListener("submit", handleSubmit);
farenheitLink.addEventListener("click", displayFarenheitTemp);
celsiusLink.addEventListener("click", displayCelsiusTemp);
let ceulsiusTemperature = tempElement;

function search(city) {
    let apiKey = "6330484588203ae9bc8288a285d5dc8b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
}

function getForecast(coordinates) {
    let apiKey = "6330484588203ae9bc8288a285d5dc8b";
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

    axios.get(forecastApiUrl).then(displayForecast);
}

function displayTemperature(response) {
    ceulsiusTemperature = Math.round(response.data.main.temp);
    tempElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    descriptionElement.innerHTML = `${response.data.weather[0].description}`;
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}`;
    windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
    timeElement.innerHTML = `Last updated ${formatDate(response.data.dt * 1000)}`;
    sunriseElement.innerHTML = `Sunrise: ${formatDate(response.data.sys.sunrise * 1000)}`
    sunsetElement.innerHTML = `Sunset: ${formatDate(response.data.sys.sunset * 1000)}`
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord)
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastHtml = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHtml += `
            <div class="col-2">
                <div class="weather-forecast-date">
                    <h4>${formatWeekDay(forecastDay.dt * 1000)}</h4>
                    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=${forecastDay.weather[0].description} width="45">
                    <div class="weather-forecast-temperatures">
                        <span class="weather-high-temp">${Math.round(forecastDay.temp.max)}°</span> - <span class="weather-low-temp">${Math.round(forecastDay.temp.min)}°</span>
                    </div>
                </div>
            </div>
            `;
        }
    });
    forecastHtml += `</div>`;
    forecastElement.innerHTML = forecastHtml;

}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`
}

function formatWeekDay(date) {
    let weekDate = new Date(date);
    let dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let day = dayArray[weekDate.getDay()];

    return `${day}`
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function displayFarenheitTemp(event) {
    event.preventDefault();
    let farenheitTemperature = (ceulsiusTemperature * 9) / 5 + 32;
    tempElement.innerHTML = Math.round(farenheitTemperature);
    celsiusLink.classList.remove("active");
    farenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    tempElement.innerHTML = ceulsiusTemperature;
    celsiusLink.classList.add("active");
    farenheitLink.classList.remove("active");
}

displayForecast();