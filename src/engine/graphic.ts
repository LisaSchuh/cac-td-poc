import { IPosition } from "@models/types";
import {
  getScreenWidth,
  getScreenHeight,
  getCanvasElement,
  getCanvasContext
} from "./constants";

window.addEventListener("DOMContentLoaded", event => {
  init();
});

const init = () => {
  const canvas = getCanvasElement();
  canvas.setAttribute("width", getScreenWidth() + "px");
  canvas.setAttribute("height", getScreenHeight() + "px");
};

export const clear = () => {
  const canvas = getCanvasElement();
  getCanvasContext().clearRect(0, 0, canvas.width, canvas.height);
};

export const drawRec = (
  pos: IPosition,
  color: string,
  width: number,
  height: number
) => {
  const ctx = getCanvasContext();
  ctx.fillStyle = color;
  ctx.fillRect(pos.x, pos.y, width, height);
};
