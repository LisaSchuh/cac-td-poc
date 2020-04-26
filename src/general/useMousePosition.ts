import { useEffect, useState } from "react";
import { IPosition } from "./types";

let position = { x: 0, y: 0 };
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const setFromEvent = (e: MouseEvent) => {
      position = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  },
  false
);

export const getMousePosition = (): IPosition => {
  return position;
};
