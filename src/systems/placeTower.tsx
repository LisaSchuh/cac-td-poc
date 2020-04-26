import { GameState } from "../general/types";

import { v4 as uuidv4 } from "uuid";
import { ETower } from "../entities/tower";
import { registerActionToggledEvent, sendLogEvent } from "../general/events";

const PLACEHOLDERTOWER = "towerPlacement";
let active = false;

registerActionToggledEvent((action, active2) => {
  if (action === "placeTower") {
    active = active2;
  }
});

export const doPlaceTowerSystem = (gameState: GameState): GameState => {
  const mouseClicked = gameState.input.mouseClicked;
  const mousePosition = gameState.input.mousePosition;

  if (gameState.gameObjects[PLACEHOLDERTOWER] && !active) {
    delete gameState.gameObjects[PLACEHOLDERTOWER];
  }
  if (!gameState.gameObjects[PLACEHOLDERTOWER] && active) {
    gameState.gameObjects[PLACEHOLDERTOWER] = ETower();
    gameState.gameObjects[PLACEHOLDERTOWER].physics.position = mousePosition;
    sendLogEvent(
      "Move your mouse to place the defender, apparently not everyone is smart enough to get this... "
    );
  }

  if (active) {
    gameState.gameObjects[PLACEHOLDERTOWER].physics.position = mousePosition;
    if (
      mouseClicked &&
      gameState.crystals >= 20 &&
      gameState.collisions["player"].filter((c) => c === "innerSanctuary")
        .length === 0
    ) {
      const guid = uuidv4();
      gameState.gameObjects[guid] = ETower();
      gameState.gameObjects[guid].physics.position = mousePosition;

      gameState.crystals -= 20;
    }
    if (mouseClicked && gameState.crystals < 20) {
      sendLogEvent("Not enough money, get a job!");
    }
  }
  return gameState;
};
