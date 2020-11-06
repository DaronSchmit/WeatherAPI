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




  
//make button on click function to make api call

//click takes input, makes API call using text input
let currentConditions;

$("#search-button").on('click',function(){
  event.preventDefault();
  let queryCity = $('input').val();
  let queryURL = 'http://api.openweathermap.org/data/2.5/weather?q='+queryCity+'&appid='+weatherKey;
  
  $.ajax({
  url: queryURL,
  method: 'GET'
})
  .then(function(response) {
    console.log(response);
    currentConditions = response;
    currentCity = currentConditions.name;
    let currentTemp = currentConditions.main.temp;
    let currentHumidity = currentConditions.main.humidity;
    let windSpeed = currentConditions.wind.speed;
    cityHistory.push(currentCity);
    
    localStorage.setItem('storedHistory', JSON.stringify(cityHistory))
  });

  
  
  
})