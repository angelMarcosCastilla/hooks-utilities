export const getWidthText = (text: string, font: string): number => {
  const $canvas = document.createElement("canvas");
  const context = $canvas.getContext("2d");

  context!.font = font;
  const metrics = context?.measureText(text);

  return metrics!.width;
};



/**
 * 
 * @param text: string text to display
 * @param font: font to display weight size family
 * @returns 
 */
export default function useTextWidth({
  text,
  font,
}: {
  text: string;
  font: string;
}) {
  const metric = getWidthText(text, font);
  return metric;
}
