import { IPosition } from "./types";

let position = { x: 0, y: 0 };
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const setFromEvent = (e: MouseEvent) => {
      position = { x: e.clientX, y: e.clientY };
    };
    const setFromTouchEvent = (e: TouchEvent) => {
      position = { x: e.touches[0].clientX, y: e.touches[0].clientX };
    };
    window.addEventListener("touchmove", setFromTouchEvent);
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      window.removeEventListener("touchmove", setFromTouchEvent);
    };
  },
  false
);

export const getMousePosition = (): IPosition => {
  return position;
};
