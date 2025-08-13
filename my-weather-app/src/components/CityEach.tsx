// NINJAS API <---> OpenCage Geocoding API
// Receive Lat and Lon from Open Weather API and use those to use NINJAS API and get the current time in the country in question

'use client';

import { useEffect, useState } from 'react';

interface Time {
  hour: number;
  minute: number;
}

interface Weather {
  coord: { lat: number; lon: number };
  main: { temp: number };
}

export default function CityEach() {
  const [time, setTime] = useState<Time | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  const timeKey = process.env.NEXT_PUBLIC_TIME_API_KEY;
  const weatherKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const city = 'tbilisi';

  useEffect(() => {
    if (!timeKey || !weatherKey) {
      setError('Missing API keys');
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setError(null);

        // 1) One OpenWeather call to get BOTH coords and temp
        const owUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${weatherKey}&units=metric`;

        const owRes = await fetch(owUrl, { signal: controller.signal });
        if (!owRes.ok) throw new Error(`OpenWeather: ${owRes.status} ${owRes.statusText}`);

        const owJson: Weather = await owRes.json();
        setWeather(owJson);

        const { lat, lon } = owJson.coord;

        // 2) WorldTime by coords
        const wtRes = await fetch(
          `https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`,
          { headers: { 'X-Api-Key': timeKey }, signal: controller.signal }
        );
        if (!wtRes.ok) throw new Error(`WorldTime: ${wtRes.status} ${wtRes.statusText}`);

        const wtJson = (await wtRes.json()) as Partial<Time>;
        setTime({
          hour: Number(wtJson.hour ?? 0),
          minute: Number(wtJson.minute ?? 0),
        });
      } catch (e: any) {
        if (e?.name !== 'AbortError') setError(e?.message || 'Fetch failed');
      }
    })();

    return () => controller.abort();
  }, [city, timeKey, weatherKey]);

  return (
    <div>
      <div className="flex flex-row justify-between pl-20 pr-20 pt-10 pb-10 mt-10 bg-cyan-800 rounded-4xl">
        <img src="/sun.svg" alt="Sun" className="w-[150px] h-[150px]" />
        <div>
            <h2 className="text-[35px] text-white">Tbilisi</h2>

          {error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <h2 className="text-[25px]">
                {time ? `${time.hour}:${String(time.minute).padStart(2, '0')}` : 'Loading...'}
              </h2>
              <h3 className="text-[35px]">
                {weather ? `${Math.floor(weather.main.temp)} °🌡` : '— °🌡'}
              </h3>
            </>
          )}
        </div>
        
      </div>
    </div>
  );
}
