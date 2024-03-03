import { useState } from "react";

export default function useToggle(initialState?: boolean) {
  const [value, setValue] = useState(initialState ?? false);

  const toggle = () => setValue(!value);

  const setToggle = (state: boolean) => setValue(state);

  return {
    toggle,
    value,
    setToggle,
  };
}
