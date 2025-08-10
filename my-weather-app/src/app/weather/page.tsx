import  {getWeather}  from "@/services/getWeather";

export default async function WeatherPage() {
  const city = "Tbilisi";
  const weather = await getWeather(city);
  console.log(weather)
  const currentHour = new Date().getHours();
  console.log("Current hour:", currentHour);
  const icon = (currentHour >= 6 && currentHour <= 18) ? '/sun.svg' : '/moon-fr.svg';
  
  return (
    <div className="mt-4 p-4 text-white">
      
      {weather ? (
        <div>
          <div className="flex flex-row gap-y-8 ml-18 justify-between max-w-250">
            <div>
              <div>
                <h2 className="text-6xl mb-2 font-semibold">{city}</h2>
                <p className="text-gray-500 text-sm">Description: {weather.weather[0].description}</p>
                
              </div>
            <p className="mt-15 text-4xl">{Math.floor(weather.main.temp)} °🌡 </p>
            </div>
            <img src={icon} className="w-50 h-50"></img>    
          </div>
          <div className=" bg-cyan-800 w-9/10 h-100 mt-25 pt-10 pl-15 rounded-3xl">
            <h2 className="text-gray-400 text-xl mb-5"><b>Air Conditions</b></h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-y-14 mt-10">
              <h3 className="text-gray-400 text-2xl"><b>Wind</b> <br/> <p className="text-xl mt-2 text-white">{weather.wind.speed} m/s</p></h3> 
              <h3 className="text-gray-400 text-2xl"><b>Feels like</b> <br/> <p className="text-xl mt-2 text-white">{Math.floor(weather.main.feels_like)} ° </p></h3>
              <h3 className="text-gray-400 text-2xl"><b>UV Index</b> <br/> <p className="text-xl mt-2 text-white">5  </p></h3>
              <h3 className="text-gray-400 text-2xl"><b>Chance of rain</b> <br/> <p className="text-xl mt-2 text-white">0% </p></h3>
            </div>
          </div>
          
        </div>
      ) : (
        <p>Could not load weather data.</p>
      )}
     

    </div>
  );
}