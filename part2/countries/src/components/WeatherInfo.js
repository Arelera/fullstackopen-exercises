import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const WeatherInfo = ({ capital }) => {
  const [info, setInfo] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
      )
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => setInfo('Could not find capital'));
    // getWeather(capital);
  }, [capital]);

  return (
    <div>
      <h2>{capital} weather</h2>
      {info && (
        <>
          <p>temperature: {Math.round(info.main.temp - 273.15)}C</p>
          <p>{info.weather[0].description}</p>
          <p>wind: {info.wind.speed} meter/sec</p>
        </>
      )}
      {console.log(info)}
    </div>
  );
};

export default WeatherInfo;
