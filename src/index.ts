import { init as initGraphic, clear as clearGraphics } from "./engine/graphic";
import { IPosition } from "@models/types";
import { draw as towerDraw } from "./actors/tower";
import nipplejs from "nipplejs";

initGraphic();

const towers: IPosition[] = [];
let floatingTower: IPosition = { x: 0, y: 100 };
let direction = "right";
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
  clearGraphics();
  towers.forEach(towerDraw);
  towerDraw(floatingTower);
};

function loop(timestamp: number) {
  var progress = timestamp - lastRender;
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);

const canvas = <HTMLCanvasElement>document.getElementById("canvas");

const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
if (width > 1025) {
  canvas.addEventListener("mousedown", function(e) {
    towers.push(getCursorPosition(canvas, e));
  });
  canvas.addEventListener("mousemove", function(e) {
    floatingTower = getCursorPosition(canvas, e);
  });
} else {
  let timeout: any;
  var manager = nipplejs.create({
    zone: document.getElementById("zone_joystick"),
    mode: "static",
    position: { left: "100px", bottom: "100px" },
    color: "#619103",
    restOpacity: 1
  });

  manager.on("end", () => {
    if (timeout) {
      clearInterval(timeout);
    }
    towers.push(floatingTower);
  });

  manager.on("start", () => {
    floatingTower = { x: 0, y: 100 };
  });

  manager.on("dir", (evt: any, data: any) => {
    direction = data.direction.angle;
  });

  manager.on("move", (evt: any, data: any) => {
    if (timeout) {
      clearInterval(timeout);
    }
    const ratio = height / width;
    let speed = 0.2;
    let intervall = 1000 / 120;
    let x = 5 * speed * (ratio / 2);
    let y = 5 * speed;

    switch (direction) {
      case "right": {
        floatingTower.x += floatingTower.x + x >= width - 20 ? 0 : x;
        timeout = setInterval(() => {
          floatingTower.x += floatingTower.x + x >= width - 20 ? 0 : x;
        }, intervall);
        break;
      }
      case "left": {
        floatingTower.x -= floatingTower.x - x <= 0 ? 0 : x;
        timeout = setInterval(() => {
          floatingTower.x -= floatingTower.x - x <= 0 ? 0 : x;
        }, intervall);
        break;
      }
      case "up": {
        floatingTower.y -= floatingTower.y - y <= 40 ? 0 : y;
        timeout = setInterval(() => {
          floatingTower.y -= floatingTower.y - y <= 40 ? 0 : y;
        }, intervall);
        break;
      }
      case "down": {
        floatingTower.y += floatingTower.y + y >= height - 40 ? 0 : y;
        timeout = setInterval(() => {
          floatingTower.y += floatingTower.y + y >= height - 40 ? 0 : y;
        }, intervall);
        break;
      }
    }
  });
}
