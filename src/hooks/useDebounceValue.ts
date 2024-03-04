import { useEffect, useState } from "react";

export default function useDebounceValue<T>(value: T, delay?: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const debounceDelay = delay || 500;

    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, debounceDelay);

    return () => {
      clearTimeout(timer);
    };

  }, [value, delay]);

  return debounceValue;
}
