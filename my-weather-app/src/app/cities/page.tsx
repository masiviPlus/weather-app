import CitySearch from "@/components/SearchInput";
import CityEach from "@/components/CityEach"
export default async function CitiesPage() {

  
  return (
    <div>
        <CitySearch/>
        <div>
            <CityEach></CityEach>
        </div>
    </div>
  );
}