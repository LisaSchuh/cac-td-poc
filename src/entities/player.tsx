import React from "react";
import { IPosition, GameObject, GameState } from "../general/types";

export const EPlayer = (): GameObject => {
  return {
    visuals: (position: IPosition) => {
      return <></>;
    },
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width: 1, height: 1 },
    },
    logic: function (state: GameState) {
      this.physics.position = state.mousePosition;
      return state;
    },
  };
};
