let timeDocument = document.querySelector("#time");
let dateDocument = document.querySelector("#date");
let cityDocument = document.querySelector("#time-zone");
let citySearch = document.querySelector("#input");
let formDocument = document.querySelector("#city-form");
let weatherDocument = document.querySelector("#today-temp");
let apiKey = "6330484588203ae9bc8288a285d5dc8b";


let weekdayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
];

let date = new Date();
let week_day = date.getDay();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let hours = date.getHours();
let minutes = date.getMinutes();

if (hours < 10) {
    hours = `0${hours}`;
}
if (minutes < 10) {
    minutes = `0${minutes}`;
}

timeDocument.innerHTML = `${hours}:${minutes}h`;
dateDocument.innerHTML = `${weekdayArray[week_day]} ${day} ${monthArray[month]} ${year}`;

formDocument.addEventListener("submit", getCity);

function getCity(event) {
    event.preventDefault();
    citySearch = citySearch.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
    console.log(response.data);
    cityDocument.innerHTML = response.data.name;
    weatherDocument.innerHTML = `${Math.round(response.data.main.temp)}°C`;
}
