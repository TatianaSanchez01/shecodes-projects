let timeDocument = document.querySelector("#time");
let dateDocument = document.querySelector("#date");
let cityDocument = document.querySelector("#time-zone");
let citySearch = document.querySelector("#input");
let formDocument = document.querySelector("#city-form");
let weatherDocument = document.querySelector("#today-temp");

let weekdayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let monthArray = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

let weather = {
    paris: { temp: 19, humidity: 80 },
    tokyo: { temp: 17, humidity: 50 },
    lisbon: { temp: 30, humidity: 20 },
    "san francisco": { temp: 20, humidity: 100 },
    oslo: { temp: -5, humidity: 20 },
    bogota: { temp: 22, humidity: 50 }
};

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
    let city = citySearch.value.toLowerCase();
    let found = false;

    for (const place in weather) {
        if (place === city) {
            city = city.toUpperCase();
            cityDocument.innerHTML = `${city}`;
            weatherDocument.innerHTML = `Day - ${weather[place].temp}°C`;
            found = true;
            break;
        }
    }

    if (!found) {
        alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
    }
}
