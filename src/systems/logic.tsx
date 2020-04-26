import { GameState } from "../general/types";

export const doLogic = (
  gameState: GameState,
  prevGameState: GameState
): GameState => {
  Object.keys(gameState.gameObjects).forEach((k) => {
    gameState = gameState.gameObjects[k].logic(gameState, prevGameState);
  });

  return gameState;
};
