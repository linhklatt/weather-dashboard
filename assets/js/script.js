var searchForm = document.querySelector("#searchForm");
var searchInput = document.querySelector("#toSearch");
var searchList = document.querySelector("#searchList");
var searchBtn = document.querySelector(".btn");
var searchCity = document.querySelector("#searchCity");
var todayResult = document.querySelector("#today");
var fiveDays = document.querySelector("#fiveDays");

var search = [];
// API key from open weather app
var apiKey = "b75ec22197eabd3066650ab90e7863eb";
// fetching api from open weather website
function weatherUpdate(cityName) {
  todayResult.innerHTML = "";
  fiveDays.innerHTML = "";

  var requestLatLonUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";
  // fetching the data
  fetch(requestLatLonUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);

      // var weatherUrl =
      //   "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      //   cityInfo.lat +
      //   "&lon=" +
      //   cityInfo.lon +
      //   "&exclude=minutely,hourly&units=imperial&appid=";
      // +apiKey;
      var weatherUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        data.coord.lat +
        "&lon=" +
        data.coord.lon +
        "&units=imperial&appid=" +
        apiKey;
      fetch(weatherUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (forecastDay) {
          console.log(forecastDay);
          var cityNameEl = document.createElement("h3");
          cityNameEl.textContent =
            data.name.toUpperCase() +
            " " +
            moment.unix(data.dt).format("MMMM DD, YYYY");
          var weatherIcon = document.createElement("img");
          weatherIcon.setAttribute(
            "src",
            "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
          );

          cityNameEl.append(weatherIcon);
          todayResult.append(cityNameEl);

          var temperature = document.createElement("p");
          var wind = document.createElement("p");
          var humidity = document.createElement("p");
          var uvi = document.createElement("p");

          temperature.textContent = "Temp: " + data.main.temp + " F " + " ";
          wind.textContent = " Wind: " + data.wind.speed + " MPH ";
          humidity.textContent = " Humidity: " + data.main.humidity + " % ";

          todayResult.append(temperature);
          todayResult.append(wind);
          todayResult.append(humidity);

          var fiveDaysResult = document.createElement("h3");
          fiveDaysResult.textContent = "Five Days Forecast";
          fiveDays.append(fiveDaysResult);

          for (var i = 3; i < forecastDay.list.length; i = i + 8) {
            var nextDayWeather = forecastDay.list[i];
            var nextDayWeatherCard = document.createElement("p");
            nextDayWeatherCard.classList.add("fiveDaysForecast");

            var date = moment.unix(nextDayWeather.dt).format("MMMM DD, YYYY");
            nextDayWeatherCard.append(date);
            var weatherIcon = document.createElement("img");
            weatherIcon.setAttribute(
              "src",
              " https://openweathermap.org/img/w/" +
                nextDayWeather.weather[0].icon +
                ".png"
            );

            nextDayWeatherCard.append(weatherIcon);
            var temp = document.createElement("p");
            temp.textContent = "Temp: " + nextDayWeather.main.temp + " F ";
            nextDayWeatherCard.append(temp);

            var wind = document.createElement("p");
            wind.textContent = "Wind: " + nextDayWeather.wind.speed + " MPH ";
            nextDayWeatherCard.append(wind);

            var humidity = document.createElement("p");
            humidity.textContent =
              "Humidity: " + nextDayWeather.main.humidity + " %";
            nextDayWeatherCard.append(humidity);

            fiveDays.append(nextDayWeatherCard);
          }
        });
    });
}
// created search button function
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  var searchValue = searchInput.value.trim();
  if (!searchValue) {
    return;
  }

  search.push(searchValue);
  weatherUpdate(searchValue);
  saveHistory();
  searchInput.value = "";
});
// save data into local storage
function init() {
  var saveSearch = JSON.parse(localStorage.getItem("search"));

  if (saveSearch) {
    search = saveSearch;
  }
  saveHistory();
}
// save search history
function saveHistory() {
  searchList.innerHTML = "";

  for (var i = search.length - 1; i >= 0; i--) {
    var toSearch = search[i];

    var savedCity = document.createElement("button");

    savedCity.textContent = toSearch;
    savedCity.setAttribute("data-index", toSearch);

    savedCity.addEventListener("click", function () {
      var searchCity = this.getAttribute("data-index");
      weatherUpdate(searchCity);
    });
    searchList.append(savedCity);
  }

  localStorage.setItem("search", JSON.stringify(search));
}
init();
