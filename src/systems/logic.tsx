import { useMouseClick } from "../general/useMouseClick";
import { useMousePosition } from "../general/useMousePosition";
import { GameObjects, ICollisions, GameState } from "../general/types";

export const useLogic = (
  gameObjects: GameObjects,
  collisions: ICollisions,
  prevGameState: GameState
): GameState => {
  const mouseClicked = useMouseClick();
  const mousePosition = useMousePosition();
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
