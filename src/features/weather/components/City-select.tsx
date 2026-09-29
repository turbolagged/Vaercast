import { DISTRICTS } from "../districts";

interface CitySelectProps {
  city: string;
  setCity: (city: string) => void;
}

export default function CitySelect({ city, setCity }: CitySelectProps) {
  const handlerFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="mt-4">
      <label className="block mb-2.5 text-sm font-medium text-heading">
        Choose a Division:{" "}
      </label>

      <select
        onChange={handlerFunction}
        value={city}
        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand 
                focus:border-brand shadow-xs placeholder:text-body"
      >
        {DISTRICTS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
