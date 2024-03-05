import { LegacyRef, useEffect, useRef, useState } from "react";

export default function useIntersectionObserve(
  options: IntersectionObserverInit
): [ref: LegacyRef<HTMLElement>, entry: IntersectionObserverEntry | null] {
  const ref = useRef<HTMLElement>(null!);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const localOption = options ? options : {};

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (observerEntry) => {
        setEntry(observerEntry[0]);
      },
      {
        ...localOption,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, entry];
}
