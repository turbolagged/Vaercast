import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 1000): T {
  const [debounced, setDebounce] = useState(value);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(debounceTimer);
  }, [value, delay]);

  return debounced;
}
