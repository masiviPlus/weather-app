"use client"
import { useState } from "react";

export default function CitySearch() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Handle search logic here, e.g., API call
    console.log("Searching for:", query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className=" bg-cyan-800 text-white w-full px-4 py-2 border-none rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
      />
      <button
        type="submit"
        className="px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-900 cursor-pointer transition"
      >
        Search
      </button>
    </form>
  );
}