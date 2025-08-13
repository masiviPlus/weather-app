// src/lib/getWeather.ts

export type WeatherData = {
  main: {
    temp: number;
    feels_like:number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
};

export async function getWeather(city: string): Promise<WeatherData | null> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!apiKey) {
    console.error("API key is missing!");
    return null;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Weather fetch error:", err);
    return null;
  }
}
