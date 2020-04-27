import { IPosition, GameObject, GameState } from "../general/types";
import Konva from "konva";

const width = 100;
const height = 100;

export const EInnerSanctuary = (): GameObject => {
  return {
    visuals: VInnerSanctuary,
    physics: {
      position: {
        x: window.innerWidth / 2 - 50,
        y: window.innerHeight / 2 - 50,
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
    fill: "#fff951",
    cornerRadius: 5,
    shadowBlur: 10,
    shadowColor: "#fff951",
  });
}
