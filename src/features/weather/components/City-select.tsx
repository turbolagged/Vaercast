import { useState, type ChangeEvent, type ReactHTMLElement } from "react";
import useDebounce from "../../../hooks/useDebounce";
import useSWR from "swr";
import { weatherUrl, fetcher } from "../api";

// interface CitySelectProps {
//   city: string;
//   setCity: (city: string) => void;
// }

// export default function CitySelect({ city, setCity }: CitySelectProps) {
//   const handlerFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setCity(e.target.value);
//   };

//   return (
//     <div className="mt-4">
//       <label className="block mb-2.5 text-sm font-medium text-heading">
//         Choose a Division:{" "}
//       </label>

//       <select
//         onChange={handlerFunction}
//         value={city}
//         className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand
//                 focus:border-brand shadow-xs placeholder:text-body"
//       >
//         {DISTRICTS.map((item) => (
//           <option key={item.value} value={item.value}>
//             {item.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

function getSearchResults(location: string) {
  // if (!location) return;
  const { data, error, isLoading } = useSWR(
    location ? weatherUrl(location) : null,
    fetcher,
  );

  // if (error) return {};
  // if (isLoading) return {};
  // return data;
  return { data, error, isLoading };
}

export default function SearchLocation() {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue, 500);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  let { data, error, isLoading } = getSearchResults(debouncedValue);

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <input
          type="text"
          onChange={handleSearchInput}
          placeholder="Search place"
          className="border border-gray-400 p-1 w-[80%] max-w-sm"
        />
      </div>
      <div>
        <ul>
          {data &&
            data.results.map((result: any) => (
              <li key={result.id}>{result?.name}</li>
            ))}
        </ul>
      </div>
    </>
  );
}
