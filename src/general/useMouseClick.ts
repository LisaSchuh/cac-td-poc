import { useEffect, useState } from "react";

export const useMouseClick = () => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      setClicked(false);
    }
  }, [clicked]);

  useEffect(() => {
    const setFromEvent = () => {
      setClicked(true);
    };

    window.addEventListener("click", setFromEvent);

    return () => {
      window.removeEventListener("click", setFromEvent);
    };
  }, []);
  return clicked;
};
