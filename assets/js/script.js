// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
//declare my variables
var searchBtn = document.querySelector(".btn");
var searchInput = document.querySelector("#toSearch");
var searchForm = document.querySelector("#searchForm");
var searchList = document.querySelector("#searchList");
var searchCity = document.querySelector("#searchCity");
var todaySearch = document.querySelector("#today");
var fiveDays = document.querySelector("#fiveDays");
var search = [];

// API key from open weather website
var apiKey = "b75ec22197eabd3066650ab90e7863eb";
//  fetching api from open weather website
function weatherUpdate(cityName) {
  todayResult.innerHTML = "";
  fiveDays.innerHTML = "";
  var requestLatLonUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&limit=5&appid=" +
    apiKey;
  fetch(requestLatLonUrl).then(function (response) {
    return response.json();
  });
  then(function (data) {
    var cityInfo = data[0];
    var weatherUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      cityInfo.lat +
      "&lon=" +
      cityInfo.lon +
      "&exclude=minutely,hourly&units=imperial&appid=" +
      apiKey;
  });

  //fetching weatherURL function
  fetch(weatherUrl).then(function (response) {
    return response.json();
  });
  then(function (forecastDay) {
    var cityNameEl = document.createElement("h3");
    cityNameEl.textContent =
      cityName.toUpperCase() +
      " " +
      moment.unix(forecastDay.current.sunrise).format("MMMM DD, YYYY");
    // get weather icon
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute(
      "src",
      "https://openweathermap.org/img/w/" +
        forecastDay.current.weather[0].icon +
        ".png"
    );
    cityNameEl.append(weatherIcon);
    todayResult.append(cityNameEl);
  });

  // creating Search button function
  searchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    var searchValue = searchInput.value.trim();
    if (!searchValue) {
      return;
    }
  });
}
