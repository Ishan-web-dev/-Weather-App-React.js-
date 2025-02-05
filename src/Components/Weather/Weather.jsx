import React, { useEffect, useRef, useState } from "react";
import "./weather.css";
import Search_icon from "../../assets/image/search.png";
import clear_icon from "../../assets/image/clear.png";
import cloud_icon from "../../assets/image/clouds.png";
import drizzle_icon from "../../assets/image/drizzle.png";
import rain_icon from "../../assets/image/rain.png";
import snow_icon from "../../assets/image/snow.png";
import wind_icon from "../../assets/image/wind.png";
import humidity_icon from "../../assets/image/humidity.png";

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(""); // Capture user input

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {

    if (!city) return; // Prevent empty search

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }

      const icon = allIcons[data.weather[0]?.icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      // console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("manali"); // Default city
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src={Search_icon}
          alt="Search"
          className="search_icon"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="loading">Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
