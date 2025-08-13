import CitySearch from "@/components/SearchInput";
import CityEach from "@/components/CityEach"
export default async function CitiesPage() {

  
  return (
    <div>
        <CitySearch/>
        <div>
            <CityEach></CityEach>
        </div>
        <button className="fixed bottom-10 right-10 bg-cyan-500 text-white pl-6 pr-6 rounded-full text-[50px] cursor-pointer hover:bg-cyan-900">+</button>
    </div>
  );
}