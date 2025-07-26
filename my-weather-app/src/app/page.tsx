import GetWeather from "@/services/GetWeather";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
 

  return (
    <div className="min-h-screen">
      <GetWeather></GetWeather>
    </div>
  );
}
