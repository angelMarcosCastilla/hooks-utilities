import { useEffect, useState } from "react";

export default function useIsOnline(): boolean {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleDetectOnline = () => {
    setIsOnline(true);
  };

  const handleDetectOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    window.addEventListener("offline", handleDetectOffline);
    window.addEventListener("online", handleDetectOnline);

    return () => {
      window.removeEventListener("offline", handleDetectOffline);
      window.removeEventListener("online", handleDetectOnline);
    };
  }, []);

  return isOnline;
}
