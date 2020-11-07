// pseudocode
// pull data from localstorage to build sidebar city history and current city weather and forecast

// Pull from localstorage

let cityHistory = localStorage.getItem("storedHistory");
let currentCity = localStorage.getItem("storedCity");

//if there's no local storage, initialize base

if(cityHistory === null){
  cityHistory = [];
  localStorage.setItem('storedHistory', JSON.stringify(cityHistory) );
}
else{
  cityHistory = JSON.parse(cityHistory);
}
if(currentCity === null){
  currentCity ='';
  localStorage.setItem('storedCity', JSON.stringify(currentCity));
}
else{
  currentCity = JSON.parse(currentCity);
}

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


function kelvToFar(kelvin){
  let farenheit = kelvin-273.15;
  farenheit = farenheit*9/5;
  farenheit += 32;
  return farenheit.toFixed(2);
}

  
//make button on click function to make api call

//click takes input, makes API call using text input
let currentConditions;

let queryCity = $('input').val();


//make API call
function getWeather(query){
  let queryURL = 'http://api.openweathermap.org/data/2.5/weather?q='+queryCity+'&appid='+weatherKey;
  $.ajax({
    url: queryURL,
    method: 'GET'
  })
    .then(function(response) {
      //get API information
      console.log(response);
  });
}

//set current weather using API call obj

$("#search-button").on('click',function(event){
  event.preventDefault();
  let queryCity = $('input').val();
  
  
    currentConditions = response;
    currentCity = currentConditions.name;
    
    //get current weather information
    let currentTemp = currentConditions.main.temp;
    currentTemp = kelvToFar(currentTemp);
    let currentHumidity = currentConditions.main.humidity;
    let windSpeed = currentConditions.wind.speed*2.237;
    
    //save search as current city, save in local storage, and update html
    localStorage.setItem('storedCity', JSON.stringify(currentCity));
    $('#current-city').text(currentCity);
    $('#temp').text(currentTemp+"\u00B0 F");
    $('#humidity').text("Humidity: "+currentHumidity+"%");
    $('#wind').text("Wind Speed: "+windSpeed.toFixed(2)+"MPH");
    
    //add city to city search history and re-save to localstorage
    cityHistory.push(currentCity);
    localStorage.setItem('storedHistory', JSON.stringify(cityHistory));
    
  });
});//search button onclick

function clearLocalStorage(){
  localStorage.setItem('storedCity', "");
  localStorage.setItem('storedHistory', []);
}

