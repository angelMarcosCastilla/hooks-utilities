import {RefObject, useEffect } from "react";

export default function useClickAway(
  ref: RefObject<HTMLElement | null>,
  callback: (e?: MouseEvent) => void
): void {
  useEffect(() => {
    const handleEvent = (e: MouseEvent) => {
      if (!ref || !ref?.current || ref.current.contains(e.target as Node))
        return;

      callback(e);
    };

    window.addEventListener("mousedown", handleEvent);
    return () => window.removeEventListener("mousedown", handleEvent);
  }, []);
}
