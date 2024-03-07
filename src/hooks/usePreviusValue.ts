import { useEffect, useRef } from "react";

export default function usePreviusValue<T>(value: T): T {
  const prevValueRef = useRef<T>(null!);

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return prevValueRef.current;
}
