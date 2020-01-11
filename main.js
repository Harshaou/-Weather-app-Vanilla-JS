const api = {
  key: "c71425a78b13df02f5808fc009562fd1",
  baseURL: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box')
searchBox.addEventListener('keypress', setQuery)

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchBox.value)
    console.log(searchBox.value)
  }
}

function getResults(query) {
  fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather => weather.json())
  .then(displayResult)
  .catch(err => errorHandling(err))
}

  function errorHandling(err) {
    if(err){
      let city = document.querySelector('.location .city')
      city.innerText = "City not found (:"
    }
  }

  function displayResult(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`
    

    let temp = document.querySelector('.temp')
    temp.textContent = `${weather.main.temp} °c`

    let feelLike = document.querySelector('.feels-like')
    feelLike.textContent = `Feels Like : ${weather.main.feels_like} °c` 
    
    
    let now = new Date()
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now)
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

