import { IPosition, GameObject, GameState } from "../general/types";
import Konva from "konva";

const width = 40;
const height = 40;

export const ETower = (): GameObject => {
  return {
    visuals: VTower,
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: (state: GameState) => state,
  };
};
function VTower(props: IPosition) {
  return new Konva.Rect({
    x: props.x,
    y: props.y,
    width,
    height,
    fill: "#bbbbbb",
    shadowBlur: 4,
    shadowColor: "#dedede",
    cornerRadius: 5,
  });
}
