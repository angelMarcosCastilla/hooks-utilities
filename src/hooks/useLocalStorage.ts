import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const localStorage = window.localStorage.getItem(key);
      return localStorage ? JSON.parse(localStorage) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const handleUpdateValue = (e: StorageEvent) => {
    if (e.key === key) {
      if (e.newValue) {
        setValue(JSON.parse(e.newValue));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleUpdateValue);
    return () => window.removeEventListener("storage", handleUpdateValue);
  }, []);

  const setLocalStorage = (newValue: T) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setLocalStorage];
}
