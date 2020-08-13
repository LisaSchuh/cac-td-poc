import { sendLogEvent } from "./events";

let lastTimestamp = Date.now();
let currentTimeStamp = Date.now();

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const setFromEvent = () => {
      sendLogEvent("event triggered");
      currentTimeStamp = Date.now();
    };

    const setFromTouchEvent = () => {
      sendLogEvent("event touch triggered");
      currentTimeStamp = Date.now();
    };

    window.addEventListener("click", setFromEvent);
    window.addEventListener("touchend", setFromTouchEvent);
    return () => {
      window.removeEventListener("click", setFromEvent);
      window.removeEventListener("touchend", setFromTouchEvent);
    };
  },
  false
);

export const getMouseClick = () => {
  const clicked = lastTimestamp < currentTimeStamp ? true : false;
  lastTimestamp = currentTimeStamp;
  return clicked;
};
