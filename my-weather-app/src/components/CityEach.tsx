'use client'; // Only if you're using Next.js 13+ App Router
// NINJAS API <---> OpenCage Geocoding API

import { useEffect, useState } from 'react';

interface Time {
  hour: string;
}

interface LonLat {
  
    coord:{
        lat: number;
        lon: number;
    }
}

export default function CityEach() {
  const [time, setTime] = useState<Time | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_TIME_API_KEY;
  const lonLatApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const city = "moscow";
  useEffect(() => {
    async function fetchUser(city: string): Promise<void> {
      try {
        const responseLonLat = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${lonLatApiKey}&units=metric`
    );
        const lonLat = await responseLonLat.json();
        const {lat, lon} = lonLat.coord
        console.log(lonLat.coord);
        const response = await fetch(`https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`, {
          headers: {
            'X-Api-Key': `${apiKey}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Time = await response.json();
        setTime(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    }

    fetchUser("moscow"); // Correct spelling here
  }, [apiKey]);

  return (
    <div>
      <h2>Time: {time?.hour ?? 'Loading...'}</h2>
    </div>
  );
}
