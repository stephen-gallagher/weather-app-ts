import axios from 'axios';
import { useState, useEffect } from 'react';
import { usePosition } from 'use-position';
// import Fade from 'react-reveal/Fade';
import Moment from 'moment';

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState({});
  const [count, setCount] = useState(0);
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

  useEffect(() => {
    if (latitude) {
      if (count === 0) {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6dc9c2a99870e8a1a5ff5c72ecc15d4e`
          )
          .then((response) => {
            console.log('the response', response.data);
            setWeatherData(response.data);
            setIconCode(response.data.weather[0].icon);
            setWeatherCategory(response.data.weather[0].main);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [latitude, longitude, count]);

  if (weatherData === null) {
    return <></>;
  }

  return <></>;
}
