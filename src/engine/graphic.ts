import { IPosition } from "@models/types";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");

export const init = () => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  canvas.setAttribute("width", width + "px");
  canvas.setAttribute("height", height + "px");
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
