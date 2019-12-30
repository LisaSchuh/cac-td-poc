import { IPosition } from "@models/types";
import { getScreenWidth, getScreenHeight } from "./utility";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");

window.addEventListener("DOMContentLoaded", event => {
  init();
});

const init = () => {
  canvas.setAttribute("width", getScreenWidth() + "px");
  canvas.setAttribute("height", getScreenHeight() + "px");
};

export const clear = () => {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawRec = (
  pos: IPosition,
  color: string,
  width: number,
  height: number
) => {
  canvasCtx.fillStyle = color;
  canvasCtx.fillRect(pos.x, pos.y, width, height);
};
