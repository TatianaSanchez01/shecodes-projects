let temp = document.querySelector("#temperature");
let time = document.querySelector("#time");
let city = document.querySelector("#city");
let precipitation = document.querySelector("#weather-precipitation");
let humidity = document.querySelector("#weather-humidity");
let wind = document.querySelector("#weather-wind");
let description = document.querySelector("#weather-description");
let cityInput = "La Ceja";

let apiKey = "6330484588203ae9bc8288a285d5dc8b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);

function displayTemperature(response) {
    temp.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    description.innerHTML = `${response.data.weather[0].description}`;
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
    wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
    time.innerHTML = formatDate(response.data.dt * 1000);
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

    return `Last updated ${day} ${hours}:${minutes}`
}