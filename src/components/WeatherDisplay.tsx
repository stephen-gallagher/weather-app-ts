import axios from 'axios';
import { useState, useEffect } from 'react';
import { usePosition } from 'use-position';
// import Fade from 'react-reveal/Fade';
import Moment from 'moment';

export default function WeatherDisplay() {
  const [count, setCount] = useState(0);
  const [weatherInfo, setWeatherInfo] = useState<WeatherData>();
  const [locationName, setLocationName] = useState('');
  const [iconCode, setIconCode] = useState('');
  const [weatherCategory, setWeatherCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [backgroundGradient, setBackgroundGradient] = useState(
    'linear-gradient(0deg, rgba(255,228,126,1) 0%, rgba(231,233,176,1) 100%)'
  );
  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  const formatDate = Moment().format('MMM Do YY');

  const tick = (): void => {
    setCount((prevState) => (prevState < 60 ? prevState + 1 : 0));
  };

  useEffect(() => {
    if (latitude) {
      const timer = setInterval(function () {
        tick();
        setDate(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  interface WeatherData {
    location: string;
    temperature: string;
    feelsLike: string;
    description: string;
    iconCode: string;
    weatherCategory: string;
    max: string;
    min: string;
  }

  useEffect(() => {
    if (latitude) {
      if (count === 0) {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6dc9c2a99870e8a1a5ff5c72ecc15d4e`
          )
          .then((response) => {
            console.log('the response', response.data);
            setWeatherInfo({
              location: response.data.name,
              temperature: response.data.main.temp,
              feelsLike: response.data.main.feels_like,
              description: response.data.weather[0].description,
              iconCode: response.data.weather[0].icon,
              weatherCategory: response.data.weather[0].main,
              max: response.data.main.temp_max,
              min: response.data.main.temp_min,
            });
            setIconCode(response.data.weather[0].icon);
            setWeatherCategory(response.data.weather[0].main);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [latitude, longitude, count]);

  useEffect(() => {
    if (weatherCategory === 'Clouds') {
      setBackgroundGradient(
        'linear-gradient(0deg, rgba(218,218,218,1) 0%, rgba(156,156,156,1) 100%)'
      );
    } else if (weatherCategory === 'Rain' || weatherCategory === 'Drizzle') {
      setBackgroundGradient(
        'linear-gradient(0deg, rgba(77,77,77,1) 0%, rgba(177,177,175,1) 100%)'
      );
    } else if (weatherCategory === 'Thunderstorm') {
      setBackgroundGradient(
        'linear-gradient(0deg, rgba(77,77,77,1) 0%, rgba(69,77,121,1) 100%)'
      );
    } else if (weatherCategory === 'Snow') {
      setBackgroundGradient(
        'linear-gradient(0deg, rgba(255,190,89,1) 0%, rgba(234,237,149,1) 100%)'
      );
    } else if (weatherCategory === 'Mist' || weatherCategory === 'Fog') {
      setBackgroundGradient(
        'linear-gradient(0deg, rgba(143,190,114,1) 0%, rgba(156,156,156,1) 100%)'
      );
    } else if (weatherCategory === 'Clear') {
      setBackgroundGradient(
        'linear-gradient(0deg, rgba(255,228,126,1) 0%, rgba(231,233,176,1) 100%)'
      );
    }
  }, [weatherCategory]);

  if (weatherInfo === null) {
    return <></>;
  }

  return (
    <>
      <div
        className=" shadow border border-dark roundedCorner col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-xs-10 offset-xs-1 mt-5 vh-70"
        style={{ background: backgroundGradient }}
      >
        <h4 className="mt-3">{formatDate}</h4>
        <h3 className="mt-2">{date.toLocaleTimeString()}</h3>
        {weatherInfo && (
          <>
            <h1 className="mt-3">{weatherInfo.location}</h1>

            <img
              src={`http://openweathermap.org/img/w/${weatherInfo.iconCode}.png`}
              alt={weatherInfo.description}
              style={{ width: '100px' }}
            ></img>
            <h1 className="tempValue">{weatherInfo.temperature}°C</h1>
            <p>Feels like {weatherInfo.feelsLike}°C</p>
            <h3>{weatherInfo.description}</h3>
            <div className="hr mt-5"></div>
            <div className="highLow mt-5">
              <h3>High: {weatherInfo.max}°C</h3>
              <h3>Low: {weatherInfo.min}°C</h3>
            </div>
          </>
        )}
      </div>
    </>
  );
}
