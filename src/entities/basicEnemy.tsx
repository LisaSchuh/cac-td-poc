import { IPosition, GameObject, GameState } from "../general/types";
import Konva from "konva";

const width = 15;
const height = 20;

export const EBasicEnemy = (): GameObject => {
  return {
    visuals: VBasicEnemy,
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: (state: GameState) => state,
    type: "ENEMY",
  };
};
function VBasicEnemy(props: IPosition) {
  return new Konva.Shape({
    sceneFunc: function (context, shape) {
      context.beginPath();
      context.moveTo(props.x, props.y);
      context.lineTo(props.x + width, props.y);
      context.lineTo(props.x + width / 2, props.y - height);
      context.closePath();

      // (!) Konva specific method, it is very important
      context.fillStrokeShape(shape);
    },
    fill: "#f946AB ",
    strokeWidth: 1,
    stroke: "#f946AB",
    cornerRadius: 2,
  });
}
