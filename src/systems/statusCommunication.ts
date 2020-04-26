import { GameState } from "../general/types";
import { sendStatusChangedEvent } from "../general/events";

export const doStatusCommunication = (
  gameState: GameState,
  prevGameState: GameState
) => {
  if (gameState.crystals !== prevGameState.crystals) {
    sendStatusChangedEvent(gameState.crystals);
  }
};
