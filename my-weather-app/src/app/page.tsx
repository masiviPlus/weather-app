import Image from "next/image";


export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const city = "Tbilisi";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
  .then(res => res.json())
  .then(data => console.log(data));

  return (
    <div className="min-h-screen bg-cyan-950 text-white">
      HELLO WORLD
      Heelooajkdoiwj
    </div>
  );
}
