import { IPosition, GameObject, GameState } from "../general/types";
import { v4 as uuidv4 } from "uuid";
import Konva from "konva";

export const EPlayer = (id?: string): GameObject => {
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
    id: id ? id : uuidv4(),
  };
};
