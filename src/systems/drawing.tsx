import { GameObjects } from "../general/types";
import Konva from "konva";

let stage: Konva.Stage;
let layer: Konva.Layer;

export const doDrawing = (gameObjects: GameObjects): void => {
  if (!stage) {
    stage = new Konva.Stage({
      container: "container", // id of container <div>
      width: window.innerWidth,
      height: window.innerHeight,
    });
    layer = new Konva.Layer();
    stage.add(layer);
  }
  layer.destroyChildren();
  Object.keys(gameObjects).forEach((s) => {
    const shape =
      gameObjects[s]?.visuals(
        gameObjects[s]?.physics.position ?? { x: 0, y: 0 }
      ) ?? null;

    if (shape) {
      layer.add(shape);
    }
  });

  layer.draw();
};
