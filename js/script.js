weatherKey = '03dbb874c27b3c94348ae4926bdc02ca'; //I don't want to publish this, but environmental variables are hard

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
updateHistoryUL(cityHistory);

function updateHistoryUL(array){
  //empty html element
  historyUL.empty();
  //reset and re-update button
  for (let i = 0; i < array.length; i++){
    //console.log(array[i]);
    let buttonLabel = array[i];

    let newLI = $('<li id="city-in-history"></li>'); //new list element
    let newButton = $('<button class="waves-effect waves-light btn sidebar-button" id="'+buttonLabel+'"></button'); //new button element
    newButton.text(buttonLabel);
    newLI.append(newButton);

    $(newButton).on('click', function(){
      getWeather($(newButton).attr("id"))
    }); //add onclick function re-display that city

    historyUL.append(newLI);//add the list element with the button inside
    historyUL.append('<br>');//spacing
  }
}

function updateArray(array, newValue){
  if(!array.includes(newValue)){
    //put the item at the beginning of the array
    array = [newValue].concat(array);
  }
  else{
    let firstPart = array.slice(0,array.indexOf(newValue));
    let lastPart = array.slice(array.indexOf(newValue)+1, array.length);
    //remove the item and put it first again
    array = [newValue].concat(firstPart, lastPart);
  }
  return array;
}

//generate Current City current weather
$('#current-forecast').append('<p><strong>5-Day forecast for '+currentCity+'</strong></p>');

//do some math to convert temperature to something normal americans can understand
function kelvToFar(kelvin){ 
  let farenheit = kelvin-273.15;
  farenheit = farenheit*9/5;
  farenheit += 32;
  return farenheit.toFixed(2);
}

//Is called by the getWeather function to get forecast and UVI
function getForecastAndUV(querylon, querylat){
  let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+querylat+"&lon="+querylon+"&appid="+ weatherKey;

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
  .then(function(response){
    console.log(response);
    //get and set UVI
    $('#uvi').text("UV Index: "+response.current.uvi);

    //Generate 5-day forecast card in forecast-container
    $(".forecast-container").empty(); //empty the container so you don't end up with 5 days of forecast for different cities
    for(let i = 1; i < 6; i++){
      let date = new Date(response.daily[i].dt*1000); //get future time
      let dateString = date.toDateString(); //convert it to a string
      let newforecastCard = $('<div class="col s2"></div>'); //make a card to contain the forecast
      let newCardDiv = $('<div class="card blue"></div>');
      let newCardContentDiv = $('<div class="card-content white-text" id="card'+i+'"></div>');
      //humidty, temp, and date
      $(newCardContentDiv).append('<span class="card-title" style="font-size: medium; font-weight: strong;">'+dateString+'</span>');
      $(newCardContentDiv).append('<p id="card'+i+'-temp">'+kelvToFar(response.daily[i].temp.day)+"\u00B0 F"+'</p>');
      $(newCardContentDiv).append('<p id="card'+i+'-humidity">'+response.daily[i].humidity+'% Humidity</p>');

      $(newCardDiv).append(newCardContentDiv);//it puts the content in the card
      $(newforecastCard).append(newCardDiv);//it puts the card in the forecastCard
      $(".forecast-container").append(newforecastCard); //append that to the container
      //materialize actually isn't as good as I though it was if I need all these divs for pete's sake
    }//do that 5 times


  })
}

//make API call and update html
function getWeather(query){
  let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+weatherKey;
  $.ajax({
    url: queryURL,
    method: 'GET'
  })
    .then(function(response) {
      //get API information
      console.log(response);

      currentCity = response.name;
      
      //get current weather information
      let currentTemp = response.main.temp;
      currentTemp = kelvToFar(currentTemp);
      let currentHumidity = response.main.humidity;
      let windSpeed = response.wind.speed*2.237;
      
      //save search as current city, save in local storage, and update html
      localStorage.setItem('storedCity', JSON.stringify(currentCity));
      $('#current-city').text(currentCity);
      $('#temp').text(currentTemp+"\u00B0 F");
      $('#humidity').text("Humidity: "+currentHumidity+"%");
      $('#wind').text("Wind Speed: "+windSpeed.toFixed(2)+"MPH");
      
      //add city to city search history and re-save to localstorage
      cityHistory = updateArray(cityHistory, currentCity);
      localStorage.setItem('storedHistory', JSON.stringify(cityHistory));
      updateHistoryUL(cityHistory);

      getForecastAndUV(response.coord.lon, response.coord.lat);

  });
}

//set current weather using API call obj

$("#search-button").on('click',function(event){
  event.preventDefault();
  let queryCity = $('input').val();
  
  getWeather(queryCity);


});//search button onclick

getWeather(currentCity);
