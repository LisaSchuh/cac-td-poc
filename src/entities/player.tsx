import { IPosition, GameObject, GameState } from "../general/types";
import Konva from "konva";

export const EPlayer = (): GameObject => {
  return {
    visuals: (position: IPosition) => {
      return new Konva.Shape({
        sceneFunc(context, shape) {},
      });
    },
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width: 1, height: 1 },
    },
    logic: function (state: GameState) {
      this.physics.position = state.input.mousePosition;
      return state;
    },
    type: "PLAYER",
  };
};
