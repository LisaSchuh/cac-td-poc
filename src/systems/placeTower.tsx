import { GameState } from "../general/types";

import { ETower } from "../entities/tower";
import { registerActionToggledEvent } from "../general/events";
import { addMultiObject, getObject, deleteObject } from "../general/engine";
import { EPlaceTower } from "../entities/placeTower";

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

  const playerInsideSanctuary =
    gameState.collisions["innerSanctuary"].filter((f) => f === "player")
      .length > 0;
  if (
    gameState.gameObjects[PLACEHOLDERTOWER] &&
    (!active || playerInsideSanctuary)
  ) {
    deleteObject(gameState, PLACEHOLDERTOWER);
  }
  if (
    !gameState.gameObjects[PLACEHOLDERTOWER] &&
    active &&
    !playerInsideSanctuary
  ) {
    gameState.gameObjects[PLACEHOLDERTOWER] = EPlaceTower();
    gameState.gameObjects[PLACEHOLDERTOWER].physics.position = mousePosition;
    // sendLogEvent(
    //   "Move your mouse to place the defender, apparently not everyone is smart enough to get this... "
    // );
  }

  if (active && !playerInsideSanctuary) {
    gameState.gameObjects[PLACEHOLDERTOWER].physics.position = mousePosition;
    if (
      mouseClicked &&
      gameState.crystals >= 20 &&
      gameState.collisions["player"].filter((c) => c === "innerSanctuary")
        .length === 0
    ) {
      const newTower = addMultiObject(gameState.gameObjects, ETower());
      getObject(
        gameState.gameObjects,
        newTower
      ).physics.position = mousePosition;

      gameState.crystals -= 20;
    }
    if (mouseClicked && gameState.crystals < 20) {
      // sendLogEvent("You need more synthwave beats do to that!");
    }
  }
  return gameState;
};
