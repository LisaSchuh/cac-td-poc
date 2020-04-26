import { GameState } from "../general/types";

export const doStatusCommunication = (
  gameState: GameState,
  prevGameState: GameState
) => {
  if (gameState.crystals !== prevGameState.crystals) {
    let event = new CustomEvent("statusChanged", {
      detail: {
        crystals: gameState.crystals,
      },
    });
    document.body.dispatchEvent(event);
  }
};
