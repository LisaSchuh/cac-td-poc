import { init as initGraphic } from "./engine/graphic";
import { IPosition } from "@models/types";
import { draw as towerDraw } from "./actors/tower";

initGraphic();

const towers: IPosition[] = [];

function getCursorPosition(
  canvas: HTMLCanvasElement,
  event: MouseEvent
): IPosition {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

const draw = () => {
  towers.forEach(towerDraw);
};

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
canvas.addEventListener("mousedown", function(e) {
  towers.push(getCursorPosition(canvas, e));
  draw();
});
