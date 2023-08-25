let temp = document.querySelector("#temperature");
let icon = document.querySelector("#weather-icon");
let time = document.querySelector("#time");
let city = document.querySelector("#city");
let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");
let humidity = document.querySelector("#weather-humidity");
let wind = document.querySelector("#weather-wind");
let description = document.querySelector("#weather-description");
let farenheitLink = document.querySelector("#farenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);
farenheitLink.addEventListener("click", displayFarenheitTemp);
celsiusLink.addEventListener("click", displayCelsiusTemp);
let ceulsiusTemperature = temp;
function displayTemperature(response) {
    ceulsiusTemperature = Math.round(response.data.main.temp);
    temp.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    description.innerHTML = `${response.data.weather[0].description}`;
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
    time.innerHTML = `Last updated ${formatDate(response.data.dt * 1000)}`;
    sunrise.innerHTML = `Sunrise: ${formatDate(response.data.sys.sunrise * 1000)}`
    sunset.innerHTML = `Sunset: ${formatDate(response.data.sys.sunset * 1000)}`
    icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", response.data.weather[0].description);
    console.log(response.data);
}

function formatDate(timestamp) {
    let date = new Date(timestamp);
    let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = dayArray[date.getDay()];

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function search(city) {
    let apiKey = "6330484588203ae9bc8288a285d5dc8b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
}

function displayFarenheitTemp(event) {
    event.preventDefault();
    let farenheitTemperature = (ceulsiusTemperature * 9) / 5 + 32;
    temp.innerHTML = Math.round(farenheitTemperature);
    celsiusLink.classList.remove("active");
    farenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    temp.innerHTML = ceulsiusTemperature;
    celsiusLink.classList.add("active");
    farenheitLink.classList.remove("active");
}

