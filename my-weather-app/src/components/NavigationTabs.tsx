"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [

    { name: "Weather", path: "/weather"},
    { name: "Cities", path: "/cities"},
    { name: "Map", path: "/map"},
    { name: "Settings", path: "/settings"},
  
];


export default function NavigationTabs() {

    const pathname = usePathname();

    return (
    <nav className="flex flex-col bg-cyan-800 space-x-4 p-4 w-min rounded-3xl	h-[calc(100vh-50px)]">
      <img src="/mainWeatherIcon.svg" alt="Weather icon" className="w-20 h-20 mx-auto mb-8"></img>
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          href={tab.path}
          className={`px-4 py-2 rounded hover:text-white ${
            pathname === tab.path ? " text-white" : "text-gray-400"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );

}