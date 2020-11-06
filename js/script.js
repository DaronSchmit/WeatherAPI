// pseudocode
// pull data from localstorage to build sidebar city history and current city weather and forecast

// Pull from localstorage

let cityHistory = JSON.parse(localStorage.getItem("storedHistory"));
let currentCity = JSON.parse(localStorage.getItem("storedCity"));

//if there's no local storage, initialize base

if(cityHistory === null){
  cityHistory = [];
  localStorage.setItem('storedHistory', JSON.stringify(cityHistory) );
}
if(currentCity === null){
  currentCity ='';
  localStorage.setItem('storedCity', JSON.stringify(currentCity));
}

//testing city history and current city
// currentCity = 'Minneapolis';
// cityHistory = ['Houston','New York', 'Miami'];

// localStorage.setItem('storedHistory', JSON.stringify(cityHistory) );
// localStorage.setItem('storedCity', JSON.stringify(currentCity));



//generate city history in sidebar

let historyUL = $('#city-history');
for (let i = 0; i < cityHistory.length; i++){
  let newLI = $('<li id="city-in-history"></li>');
  newLI.text(cityHistory[i]);
  historyUL.append(newLI);
}

//generate Current City current weather
$('#current-conditions').append('<h4>Current conditions in '+currentCity+'</h4>');
$('#current-forecast').append('<p><strong>5-Day forecast for '+currentCity+'</strong></p>');

<<<<<<< HEAD
let queryURL = 

$.ajax({
  url: 'https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=03dbb874c27b3c94348ae4926bdc02ca',
=======
let queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid='+weatherKey;
let currentConditions;

$.ajax({
  url: queryURL,
>>>>>>> 8d80a2ddd24a01fc4b5233c6f87e813bb4d021f0
  method: 'GET'
})
  .then(function(response) {
    console.log(response);
      currentConditions = response;
  });
  
  


  let testObj = {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 16093,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
  }

                