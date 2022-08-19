import { useState, useEffect } from 'react'
import axios from 'axios'


const Header = (props) => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState({name: '', weather: [{main: 'NA'}], main: {temp: 0}});
  const [location, setLocation] = useState('Toronto');
  const [temp, setTemp] = useState({temp: 'metric', unit: ''});
  
  


  const apiKey = process.env.REACT_APP_WEATHER_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${temp.temp}`;


useEffect(() => {
  setInterval(() => setTime(new Date()), 1000);
}, []);


const getWeatherData = () => {
  axios.get(apiUrl).then((res) => {
    setWeather(res.data)
    temp.temp === 'metric' ? setTemp({unit: 'C', temp: 'imperial'}) : setTemp({unit: 'F', temp: 'metric'});
    console.log('weather', weather)
  })  
}

useEffect(() => {
  getWeatherData()
}, [])

const tempRnd = () => {
  return Math.round(weather["main"]["temp"])
}

const newCity = (e) => {
  e.preventDefault();
  console.log(e)
  getWeatherData()
}

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

{/* <div className="spin">
RELOAD
</div> */}

<div className="weather">
  <span>

    <form>
    <input  className="cityInput" 

            placeholder={location} 
            onChange={(e) => setLocation(e.target.value)}
          
            />
    <button className="hiddenButton" type='submit' onClick={getWeatherData}></button>
    </form>
    
  </span>
  &nbsp;&nbsp;
  <span className="center">{weatherImg()}</span>
  &nbsp;&nbsp;
  <span onClick={getWeatherData}>{tempRnd()}°{temp.unit}</span>
</div>

</section>

  );
};

export default Header;