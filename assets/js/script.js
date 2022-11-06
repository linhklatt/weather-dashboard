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

// creating Search button function
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  var searchValue = searchInput.value.trim();
  if (!searchValue) {
    return;
  }
});
