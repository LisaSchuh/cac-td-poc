import { IPosition, GameObject, GameState } from "../general/types";
import Konva from "konva";

const width = 125;

export const EInnerSanctuary = (): GameObject => {
  return {
    visuals: VInnerSanctuary,
    physics: {
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      velocity: 0,
      direction: { x: 0, y: 0 },
      radius: width,
    },
    logic: function (id: string, state: GameState) {
      if (
        state.input.mouseClicked &&
        state.collisions["player"].filter((c) => c === id).length > 0
      ) {
        state.crystals += 10;
        let audio = new Audio("LSC_Kick_03.wav");
        audio.play();
      }
      return state;
    },
    type: "INNERSANCTUARY",
  };
};

function VInnerSanctuary(position: IPosition) {
  return new Konva.Circle({
    x: position.x,
    y: position.y,
    radius: width,
    cornerRadius: 80,
    stroke: "#f946AB",
    shadowBlur: 20,
    shadowColor: "#f946AB",
    fillLinearGradientColorStops: [0, "#ffd319", 1, "#ff784a"],
    fillLinearGradientStartPoint: { x: 0, y: -20 },
    fillLinearGradientEndPoint: { x: 0, y: 100 },
    strokeWidth: 1,
  });
}
