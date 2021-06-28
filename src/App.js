import React, { useState } from 'react';





const api ={
  key: "8b70bee19e8089a4f25be9ae6bbee371",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          // console.log(result);
          });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let time = new Date().toLocaleString();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year} ${time}`
  }
  return (
    <div className="app">
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'warm' ) : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search.........." 
            onChange={e => setQuery(e.target.value)} 
            value={query}
            onKeyPress={search}
            
            />
          
        </div>
        {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">City & Country = {weather.name},{weather.sys.country}</div>
          {/* <div className="location">TimeZone = {weather.name},{weather.timezone}</div> */}
          <div className="date">Searched date & Time = {dateBuilder(new Date())}</div>
          {/* <p>The time is {time}</p> */}
        </div>
        <div className="weather-box">
          <div className="temp">Current Temperature = {Math.round(weather.main.temp)}°C</div>
          <div className="temp">Temperature Min = {Math.round(weather.main.temp_min)}°C</div>
          <div className="temp">Temperature max = {Math.round(weather.main.temp_max)}°C</div>
          <div className="weather">Current weather = {weather.weather[0].description}</div>
        </div>
      </div>
        ) : ('')}
      </main>
    </div>
    </div>
    
  );
 
}

export default App;
