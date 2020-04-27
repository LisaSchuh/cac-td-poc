import { IPosition, GameObject, GameState } from "../general/types";
import Konva from "konva";

const width = 30;
const height = 10;

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
  return new Konva.Rect({
    x: props.x,
    y: props.y,
    width,
    height,
    fill: "#8c1eff",
    shadowBlur: 8,
    shadowColor: "white",
    cornerRadius: 5,
  });
}
