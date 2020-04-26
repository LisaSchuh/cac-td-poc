import { getMousePosition } from "../general/useMousePosition";
import { GameObjects, GameState } from "../general/types";

import { v4 as uuidv4 } from "uuid";
import { ETower } from "../entities/tower";

const PLACEHOLDERTOWER = "towerPlacement";
let active = false;

document.body.addEventListener("actionToggled", (e: any) => {
  if (e.detail.name === "placeTower") {
    active = e.detail.active;
  }
});

export const doPlaceTowerSystem = (
  gameObjects: GameObjects,
  gameState: GameState
): GameState => {
  const mouseClicked = gameState.mouseClicked;
  const mousePosition = getMousePosition();

  if (gameObjects[PLACEHOLDERTOWER] && !active) {
    delete gameObjects[PLACEHOLDERTOWER];
  }
  if (!gameObjects[PLACEHOLDERTOWER] && active) {
    gameObjects[PLACEHOLDERTOWER] = ETower();
    gameObjects[PLACEHOLDERTOWER].physics.position = mousePosition;
    console.log(
      "Move your mouse to place the defender, apparently not everyone is smart enough to get this... "
    );
  }

  if (active) {
    gameObjects[PLACEHOLDERTOWER].physics.position = mousePosition;
    if (
      mouseClicked &&
      gameState.crystals >= 20 &&
      gameState.collisions["player"].filter((c) => c === "innerSanctuary")
        .length === 0
    ) {
      const guid = uuidv4();
      gameObjects[guid] = ETower();
      gameObjects[guid].physics.position = mousePosition;

      gameState.crystals -= 20;
    }
    if (mouseClicked && gameState.crystals < 20) {
      console.log("Not enough money, get a job!");
    }
  }
  return gameState;
};
