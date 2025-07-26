"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

export default function GetWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const city = "Tbilisi";

  useEffect(() => {
    if (!apiKey) {
      console.error("API key is missing!");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((res) => res.json())
      .then((data: WeatherData) => {
        setWeather(data);
      })
      .catch((err) => console.error("Weather fetch error:", err));
  }, [apiKey]);

  return (
    <div className="mt-4 p-4 text-white">
      <h2 className="text-xl mb-2 font-semibold">Weather in {city}</h2>
      {weather ? (
        <>
          <p>🌡 Temp: {weather.main.temp} °C</p>
          <p>🌥 Description: {weather.weather[0].description}</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
        </>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}
