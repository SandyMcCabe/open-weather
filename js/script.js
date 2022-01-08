//global variables
var searchHistory = [];
var 

//api url
//api key

//dom elements (search form, click button, today weather, forecast)



// when hit search 
// check if empty value
// trim spaces from end
// api fetch coordinates - function
// then clear search box

// function to get coordinates from API
// append coordinates and city to local storage - function (passing city and coords)
// pass coordinates to get weather - new function

// function to write to local storage (appendToHistory)
// check to make sure that it's not already in the array
// then push to empty array 
// write to local storage
// re-render the history buttons

//fetch weather (takes in "location")
//fetches weather information from the weather geo location endpoints
// city = location.name
// long = location.longitude
// lat = location.latitude
// calls function to write city to page
// calls out to weather api for current weather (passing lat and long)
// calls function to write this on the page -- function, passing city, data.current, data.timezone
// calls out to weather api for forecast (passing lat and long)
// calls function to write this on the page -- function passing data.daily and data.timezone

// render current weather 
// take in city, weather, timezone
// use day.js or moment.js
//display date on page
//store response data from our fetch request in variables
    // temp, wind, humid, uvi
    // openweathermap.org
    // weather.temp, weather.wind_speed, weather.humidity, weather.uvi 
    //pull icon from openweather.map.org/img weather.weather.icon
    //icon for weather.description or weather.main (array)



//re-render search history boxes (new function)

// function to get weather for coordinates





//callback function to get local storage and copy down to local array

//page listeners (search button, and history/cites)