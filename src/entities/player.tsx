import { GameObject, GameState, DummyVisuals } from "../general/types";

export const EPlayer = (): GameObject => {
  return {
    visuals: DummyVisuals,
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width: 1, height: 1 },
    },
    logic: function (id: string, state: GameState) {
      this.physics.position = state.input.mousePosition;
      console.log(this.physics.position.x);
      return state;
    },
    type: "PLAYER",
  };
};
