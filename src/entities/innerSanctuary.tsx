import { IPosition, GameObject, GameState } from "../general/types";
import Konva from "konva";

const width = 125;
const height = 125;

export const EInnerSanctuary = (): GameObject => {
  return {
    visuals: VInnerSanctuary,
    physics: {
      position: {
        x: window.innerWidth / 2 - 63,
        y: window.innerHeight / 2 - 63,
      },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: function (state: GameState) {
      if (
        state.input.mouseClicked &&
        state.collisions["player"].filter((c) => c === "innerSanctuary")
          .length > 0
      ) {
        state.crystals += 10;
      }
      return state;
    },
    type: "INNERSANCTUARY",
  };
};

function VInnerSanctuary(position: IPosition) {
  return new Konva.Rect({
    x: position.x,
    y: position.y,
    width,
    height,
    cornerRadius: 80,
    stroke: "#f946AB",
    shadowBlur: 20,
    shadowColor: "#f946AB",
    fillLinearGradientColorStops: [0, "#ffd319", 1, "#ff2975"],
    fillLinearGradientStartPoint: { x: 0, y: 50 },
    fillLinearGradientEndPoint: { x: 0, y: 180 },
    strokeWidth: 1,
  });
}
