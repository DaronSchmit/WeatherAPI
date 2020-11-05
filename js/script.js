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
