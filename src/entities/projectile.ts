import { IPosition, GameObject, GameState, DummyLogic } from "../general/types";
import Konva from "konva";

const width = 2;
const height = 2;

export const EProjectile = (): GameObject => {
  return {
    visuals: VProjectile,
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: DummyLogic,
    type: "PROJECTILE",
  };
};
function VProjectile(props: IPosition) {
  return new Konva.Shape({
    sceneFunc: function (context, shape) {
      context.beginPath();
      context.moveTo(props.x, props.y);
      context.lineTo(props.x + 10, props.y);
      context.closePath();

      // (!) Konva specific method, it is very important
      context.fillStrokeShape(shape);
    },
    // radius: 2,
    fill: "white",
    // strokeWidth: 1,
    stroke: "white",
    // cornerRadius: 2,
  });
}
