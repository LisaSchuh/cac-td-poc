import { getCanvasElement } from "./constants";
import { IPosition } from "@models/types";

export const getCursorPosition = (event: MouseEvent): IPosition => {
  const rect = getCanvasElement().getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};
