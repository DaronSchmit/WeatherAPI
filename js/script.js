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
updateHistoryUL(cityHistory);

function updateHistoryUL(array){
  //empty html element
  historyUL.empty();
  //reset and re-update button
  for (let i = 0; i < array.length; i++){
    //console.log(array[i]);
    let buttonLabel = array[i];
    let newLI = $('<li id="city-in-history"></li>');
    let newButton = $('<button class="waves-effect waves-light btn sidebar-button" id="'+buttonLabel+'"></button');
    newButton.text(buttonLabel);
    newLI.append(newButton);
    $(newButton).on('click', function(){
      getWeatherUpdateHTML($(newButton).attr("id"))
    });
    historyUL.append(newLI);
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
$('#current-conditions').append('<h4>Current conditions in '+currentCity+'</h4>');
$('#current-forecast').append('<p><strong>5-Day forecast for '+currentCity+'</strong></p>');


function kelvToFar(kelvin){
  let farenheit = kelvin-273.15;
  farenheit = farenheit*9/5;
  farenheit += 32;
  return farenheit.toFixed(2);
}


//make API call
function getWeatherUpdateHTML(query){
  let queryURL = 'http://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+weatherKey;
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

  });
}

//set current weather using API call obj

$("#search-button").on('click',function(event){
  event.preventDefault();
  let queryCity = $('input').val();
  
  getWeatherUpdateHTML(queryCity);


});//search button onclick

getWeatherUpdateHTML(currentCity);
