import { useEffect } from "react";

export default function useKeyPress(
  key: string,
  callback: (e: KeyboardEvent) => void
) {
  const handleCallback = (e: KeyboardEvent) => {
    if (e.key === key) {
      callback(e);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleCallback);
    return () => window.removeEventListener("keydown", handleCallback);
  }, []);
}
