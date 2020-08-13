import { IPosition, GameObject, DummyLogic } from "../general/types";
import Konva from "konva";

const width = 40;
const height = 40;

export const EPlaceTower = (): GameObject => {
  return {
    visuals: VPlaceTower,
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: DummyLogic,
    type: "TOWER",
  };
};
function VPlaceTower(props: IPosition) {
  return new Konva.Rect({
    x: props.x,
    y: props.y,
    width,
    height,
    // fillLinearGradientColorStops: [0, "#ffd319", 1, "#ff2975"],
    // fillLinearGradientStartPoint: { x: 0, y: 10 },
    // fillLinearGradientEndPoint: { x: 0, y: 40 },
    // fill: "rgb(20, 187, 175)",
    fill: "#f5b700",
    shadowBlur: 2,
    shadowColor: "white",
    cornerRadius: 0,
    stroke: "#f0cc5f ",
    strokeWidth: 1,
  });
}
