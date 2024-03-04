import { useCallback, useState } from "react";

export default function useCopyClipboard() {
  const [textCopy, setTexCopy] = useState<string>("");

  const onCopyClipboard = useCallback((text: string)=>{
    navigator.clipboard.writeText(text);
    setTexCopy(text);
  },[])

  return {
    onCopyClipboard,
    textCopy,
  }
}
