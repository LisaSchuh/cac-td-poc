import { IPosition } from "./types";
import { sendLogEvent } from "./events";

let position = { x: 0, y: 0 };
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const setFromEvent = (e: MouseEvent) => {
      position = { x: e.clientX, y: e.clientY };
    };
    const setFromTouchEvent = (e: TouchEvent) => {
      sendLogEvent(`touchmove ${e.touches[0].clientX}`);
      position = { x: e.touches[0].clientX, y: e.touches[0].clientX };
    };
    window.addEventListener("touchmove", setFromTouchEvent);
    // window.addEventListener("touchstart", setFromTouchEvent);
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      // window.removeEventListener("touchstart", setFromTouchEvent);
      window.removeEventListener("touchmove", setFromTouchEvent);
    };
  },
  false
);

export const getMousePosition = (): IPosition => {
  return position;
};
