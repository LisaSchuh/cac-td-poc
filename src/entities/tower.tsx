import { IPosition, GameObject, GameState } from "../general/types";
import { v4 as uuidv4 } from "uuid";
import Konva from "konva";

const width = 40;
const height = 40;

export const ETower = (id?: string): GameObject => {
  return {
    visuals: VTower,
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: (state: GameState) => state,
    type: "TOWER",
    id: id ? id : uuidv4(),
  };
};
function VTower(props: IPosition) {
  return new Konva.Rect({
    x: props.x,
    y: props.y,
    width,
    height,
    // fillLinearGradientColorStops: [0, "#ffd319", 1, "#ff2975"],
    // fillLinearGradientStartPoint: { x: 0, y: 10 },
    // fillLinearGradientEndPoint: { x: 0, y: 40 },
    // fill: "rgb(20, 187, 175)",
    fill: "#5da4a6",
    shadowBlur: 2,
    shadowColor: "white",
    cornerRadius: 0,
    stroke: "#6df1d8 ",
    strokeWidth: 1,
  });
}
