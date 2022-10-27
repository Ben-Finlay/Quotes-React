import { useState, useEffect } from 'react'
import axios from 'axios'


const Header = (props) => {
  // Variables
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({name: '', weather: [{main: 'NA'}], main: {temp: 25}});
  const [location, setLocation] = useState('Toronto');
  const [temp, setTemp] = useState({temperature: 'metric', unit: 'C'});

  // Props

  const {
    getQuotes
  } = props
  
  // Weather API Variables

  const apiKey = process.env.REACT_APP_WEATHER_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

// useEffect calls (Time and WeatherAPI)

useEffect(() => {
  setInterval(() => setTime(new Date()), 1000);
}, []);

useEffect(() => {
  getWeatherData()
}, [])

// Axios call to get weather data

const getWeatherData = () => {
  axios.get(apiUrl).then((res) => {
    setWeather(res.data)
    console.log('weather', res.data)
  })  
}

//Round temperature from weather API

const tempRnd = () => {
  return Math.round(weather["main"]["temp"])
}

const flipUnits = () => {
  if (temp.temperature === 'metric') {
    setTemp({unit: 'F', temperature: 'imperial'})
    return weather['main']['temp'] = weather['main']['temp'] * 1.8 + 32; 
  } else {
    setTemp({unit: 'C', temperature: 'metric'})
    return weather['main']['temp'] = (weather['main']['temp'] - 32) * ( 5 / 9 ); 
  }
}

// const newCity = (e) => {
//   console.log('value passed: ', e)
//   //setLocation(e);
//   console.log('location', location)
//   getWeatherData();
 
// }

const weatherImg = () => {
  let conditions = weather['weather'][0]['main']

    if (conditions === 'NA') {
    return <img src='/weather/wi-na.png' alt='N/A' />
    }
    else if (conditions === 'Clear') {
      return <img src='/weather/wi-day-sunny.png' alt='clear' />
    }     
    else if (conditions === 'Thunderstorm') {
      return <img src='/weather/wi-storm-showers.png' alt='thunderstorm' />
    }
    else if (conditions === 'Drizzle') {
      return <img src='/weather/wi-day-rain.png' alt='drizzle' />
    }
    else if (conditions === 'Rain') {
      return <img src='/weather/wi-showers.png' alt='rain' />
    }
    else if (conditions === 'Snow') {
      return <img src='/weather/wi-snow.png' alt='snow' />
    }
    else if (conditions === 'Clouds') {
      return <img src='/weather/wi-cloudy.png' alt='cloudy' />
    }
    else if (conditions === 'Atmosphere' || 'Mist' || 'Smoke' || 'Haze' || 'Dust' || 'Fog' || 'Sand' || 'Ash' || 'Squal' || 'Tornado') {
      return <img src='/weather/wi-fog.png' alt='fog' />
    }

      return <img src='/weather/wi-na.png' alt='N/A' />
}


  return (
<section className="header">

<div className="clock" >
{time.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                })}
</div>

<div className="spin" onClick={() => getQuotes()}>
<img src='refresh-cw.svg' alt='Refresh' />
</div>

<div className="weather">

  <span>
    <form onSubmit={event => event.preventDefault()}>
    <input  className="cityInput" 
            id='cityInput'
            name='cityInput'
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            autoComplete="off"
          
            />
    <input className="hiddenButton" type='submit' onClick={getWeatherData}></input>
    </form>
  </span>


  &nbsp;
  <span className="center">{weatherImg()}</span>
  &nbsp;&nbsp;
  <span onClick={flipUnits}>{tempRnd()}°{temp.unit}</span>
</div>

</section>

  );
};

export default Header;