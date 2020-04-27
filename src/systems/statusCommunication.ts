import { GameState } from "../general/types";
import { sendStatusChangedEvent } from "../general/events";

export const doStatusCommunication = (
  gameState: GameState,
  prevGameState: GameState
) => {
  if (
    gameState.crystals !== prevGameState.crystals ||
    gameState.health !== prevGameState.health
  ) {
    sendStatusChangedEvent(gameState.crystals, gameState.health);
  }
};
