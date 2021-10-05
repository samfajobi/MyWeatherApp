import React, { useState } from 'react';
import classes from './App.module.css';


const api = {
  key: "27894b9fe727f7d57302985a25fab3b6",
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}


const App = (props) => {


  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result); 
        console.log(result)

        setQuery('');  
      }
      );
    };

  };

  const dateBuilder = (d) => {
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  let Months = ["January","Febuary","March","April","May","June","July","August",
  "September","October","November","December"];

 let today = new Date();
 let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


  let day = days[d.getDay()]
  let month = Months[d.getMonth()]
  let date = d.getDate()
  let year = d.getFullYear()

  return `${day} ${date} ${month}  ${year} ${time}`
};

 
  return (
    <div className={classes.App}>
      
      <main>
        <div className={classes.SearchBox}>
          <input 
          className={classes.SearchBar}
          placeholder="Type in any country of your choice..."
          type='text'
          onChange={e => setQuery(e.target.value)} 
          value= {query}
          onKeyPress={search} 
          />
          
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className={classes.LocationBox}>
            <div className={classes.location}>{weather.name}, {weather.sys.country} </div>
            <div className={classes.Date}>{dateBuilder(new Date())}</div>
           
  
            </div>
            
          <div className={classes.WeatherBox}>
            <div className={classes.Temp}>{Math.round(weather.main.temp)}°C</div>
            <div className={classes.weather}>{weather.weather[0].description}</div>
            <div className={classes.tempMinMax}>{weather.main.feels_like}°C/{weather.main.temp_max}°C</div>
            <div className={classes.humidity}>Humidity: {weather.main.humidity}</div>
            <div className={classes.pressure}>Pressure: {weather.main.pressure}</div>

          </div>
        </div>
        ) : ('')}
         
      </main>
     
    </div>
  );
  };

export default App;











