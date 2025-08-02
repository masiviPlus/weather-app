import  {getWeather}  from "@/services/getWeather";

export default async function WeatherPage() {
  const city = "Tbilisi";
  const weather = await getWeather(city);
  console.log(weather)

  return (
    <div className="mt-4 p-4 text-white">
      
      {weather ? (
        <div className="flex justify-between max-w-250">
        <div >
            <div>
                <h2 className="text-6xl mb-2 font-semibold">{city}</h2>
                <p className="text-gray-500 text-sm">Description: {weather.weather[0].description}</p>
                <p className="text-gray-500 text-sm">Wind Speed: {weather.wind.speed} m/s</p> 
            </div>
            <p className="mt-15 text-4xl">{weather.main.temp} °🌡 </p>
        </div>
          <img src="/sun.svg" alt="Sun icon" className="w-50 h-50"></img>
          
        </div>
      ) : (
        <p>Could not load weather data.</p>
      )}
    </div>
  );
}