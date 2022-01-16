// Set global variables
let APIKey = "691e962c4a728ff0ee3b3b17e898d64f";
let locations = [];

function getWeatherData(lat, lon, city) {
    // build the URL string to OpenWeather
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=,minutely,hourly,alerts&appid=" + APIKey;

    //call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // store the data from the API call
        .then(function (response) {
            showWeatherData(response, city);
        });
};

function loadWeatherCity(city, isClicked) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&appid=" + APIKey;
    var weatherContainer = $("#weatherContainer");

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // console.log(response);
            if (!isClicked) {
                saveLocations(response);
                renderLocations();
            }
            //load weather
            getWeatherData(response.city.coord.lat, response.city.coord.lon, response.city.name);
        }).catch(function (response) {
            alert("Not a valid City");
        });
}

function showWeatherData(weatherData, city) {
    //load current
    var iconURL = "http://openweathermap.org/img/w/" + weatherData.current.weather[0].icon + ".png";  //get weather icon
    $("#cityDate").html(city + " (" + new Date().toLocaleDateString() + ") <img id=\"icon\" src=\"" + iconURL + "\" alt=\"Weather icon\"/>");

    var temp = parseInt(weatherData.current.temp);
    temp = Math.round(((temp - 273.15) * 1.8) + 32);
    $("#currentTemp").html(" " + temp + "  &degF");
    $("#currentHumidity").html(weatherData.current.humidity + "%");
    $("#currentWindSpeed").html(weatherData.current.wind_speed + " MPH");

    //load 5 Day
    var ul5 = $("#fiveDay");
    ul5.empty();

    for (i = 1; i < 6; i++)  //days 1-5
    {
        //make the elements to display the 5 day forecast and append to the parent div
        var div = $("<div>").addClass("bg-primary");

        var dateTime = parseInt(weatherData.daily[i].dt);
        var dateHeading = $("<h6>").text(new Date(dateTime * 1000).toLocaleDateString());  //convert unix time to javascript date
        var iconDayURL = "http://openweathermap.org/img/w/" + weatherData.daily[i].weather[0].icon + ".png";  //get weather icon
        var icon = $("<img>").attr("src", iconDayURL);

        //convert kelvin to Fahrenheit
        temp = parseInt(weatherData.daily[i].temp.day);
        temp = Math.round(((temp - 273.15) * 1.8) + 32);
        var temp5 = $("<p>").html("Temp: " + temp + "  &degF");

        var humidity5 = $("<p>").html("Humidity: " + weatherData.daily[i].humidity + "%");

        div.append(dateHeading);
        div.append(icon);
        div.append(temp5);
        div.append(humidity5);
        ul5.append(div);

    }

    $("#weatherData").show();
}

//load locations from local storage to the locations array
function loadLocations() {
    var locationsArray = localStorage.getItem("locations");
    if (locationsArray) //if not undefined
    {
        locations = JSON.parse(locationsArray);  //make sure there is a locations object in local storage
        renderLocations();
    }
    else {
        localStorage.setItem("locations", JSON.stringify(locations));  //if not make one and store it to local storage
    }
}

function renderLocations() {
    var divLocations = $("#locationHistory");
    divLocations.empty();  //clear the cities list before rendering it from the local storage object

    $.each(locations, function (index, item) {
        var a = $("<a>").addClass("list-group-item list-group-item-action city").attr("data-city", locations[index]).text(locations[index]);
        divLocations.append(a);
    });

    $("#locationHistory > a").off();

    $("#locationHistory > a").click(function (event) {
        var element = event.target;
        var city = $(element).attr("data-city");

        loadWeatherCity(city, true);
    });

}

//save cities to the locations array and local storage
function saveLocations(data) {
    var city = data.city.name;

    locations.unshift(city);
    //convert to a string and sent to local storage
    localStorage.setItem("locations", JSON.stringify(locations));
}

$(document).ready(function () {
    // hide the empty data containers
    $("#weatherData").hide();

    // display the city history
    loadLocations();

    $("#searchBtn").click(function (event) {  //event handler for the city search input
        var element = event.target;
        var searchCriteria = $("#cityCode").val();  //get the user input

        if (searchCriteria !== "")  //make sure it is not empty
        {
            loadWeatherCity(searchCriteria, false);

        }
    });
});