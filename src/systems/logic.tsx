import { getMouseClick } from "../general/useMouseClick";
import { getMousePosition } from "../general/useMousePosition";
import { GameObjects, ICollisions, GameState } from "../general/types";

export const doLogic = (
  gameObjects: GameObjects,
  collisions: ICollisions,
  prevGameState: GameState
): GameState => {
  const mouseClicked = getMouseClick();
  const mousePosition = getMousePosition();
  let gameState = {
    collisions,
    mousePosition,
    mouseClicked,
    crystals: prevGameState.crystals,
  };
  Object.keys(gameObjects).forEach((k) => {
    gameState = gameObjects[k].logic(gameState);
  });

  return gameState;
};
