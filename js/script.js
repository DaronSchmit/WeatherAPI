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

$.ajax({
  url: 'https://api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=03dbb874c27b3c94348ae4926bdc02ca',
  method: 'GET'
})
  .then(function(response) {
    console.log(response);
  })
