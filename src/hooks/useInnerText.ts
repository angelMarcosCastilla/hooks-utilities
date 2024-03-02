import { useEffect, useMemo, useRef, useState } from "react";
import { getWidthText } from "./useTextWidth";

function createInnerString(
  width: number | undefined,
  arrayString: string[],
  font: string,
  separator?: string
): {
  innerString: string;
  pending: number;
} {
  const localSeparator = separator || ", ";

  if (arrayString.length === 0) {
    return { innerString: "", pending: 0 };
  }

  if (!width) {
    return { innerString: arrayString.join(localSeparator), pending: 0 };
  }

  let localInnerString = "";
  let pendingArrayString = arrayString.length;

  const widthSeparator = getWidthText(localSeparator, font);

  for (let i = 0; i < arrayString.length; i++) {
    const currentString = arrayString[i];
    const currentWidthString = getWidthText(currentString, font);
    // si la lista tiene solo un String en el array
    if (arrayString.length === 1) {
      localInnerString += currentString;
      pendingArrayString = 0;
      break;
    }

    // si hay varios en el array, siempre mostramos el primero
    if (i === 0) {
      if (currentWidthString > width) {
        localInnerString += currentString;
        pendingArrayString--;
        break;
      }
      if (currentWidthString < width) {
        localInnerString += currentString;
        localInnerString += localSeparator;
        pendingArrayString--;
        continue;
      }
    }

    // si estamos en el ultimo emails (no hay badge)
    if (i === arrayString.length - 1) {
      // caso cabe
      const accInnerString =
        getWidthText(localInnerString, font) + currentWidthString;

      // cabe
      if (accInnerString < width) {
        localInnerString += currentString;
        pendingArrayString--;
        break;
      }

      if (accInnerString > width) {
        break;
      }
    }

    // para los string del medio
    const bagdeText = ` y ${pendingArrayString} mas`;
    const widthBadgeText = getWidthText(bagdeText, font);
    const accWidthText =
      getWidthText(localInnerString, font) +
      currentWidthString +
      widthSeparator +
      widthBadgeText;

    // se pasa
    if (accWidthText > width) {
      break;
    }

    // no se pasa
    if (accWidthText < width) {
      localInnerString += currentString;
      localInnerString += separator;
      pendingArrayString--;
      continue;
    }
  }

  return {
    innerString: localInnerString,
    pending: pendingArrayString,
  };
}

export default function useInnerText({
  arrayList,
  separator,
}: {
  arrayList: string[];
  separator: string;
}) {
  const refContainer = useRef<HTMLParagraphElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  const resizeHandler = () => {
    if (!refContainer) return;
    const containerWidth = refContainer.current?.clientWidth;

    setWidth(containerWidth!);
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const data = useMemo(() => {
    if (!refContainer.current) {
      return { innerString: "", pending: 0 };
    }

    const style = window.getComputedStyle(refContainer.current);
    const fontSize = style.font;
    return createInnerString(width, arrayList, fontSize, separator);
  }, [width, arrayList, separator]);

  return {
    innerString: data.innerString,
    pending: data.pending,
    ref: refContainer,
  };
}
