import { sendLogEvent } from "./events";

let lastTimestamp = Date.now();
let currentTimeStamp = Date.now();

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const setFromEvent = () => {
      currentTimeStamp = Date.now();
    };

    window.addEventListener("click", setFromEvent);
    window.addEventListener("touchend", setFromEvent);
    return () => {
      window.removeEventListener("click", setFromEvent);
      window.removeEventListener("touchend", setFromEvent);
    };
  },
  false
);

export const getMouseClick = () => {
  const clicked = lastTimestamp < currentTimeStamp ? true : false;
  lastTimestamp = currentTimeStamp;
  return clicked;
};
