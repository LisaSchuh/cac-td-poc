import { useMouseClick } from "../general/useMouseClick";
import { useMousePosition } from "../general/useMousePosition";
import { GameObjects, GameSystemFunction } from "../general/types";

import { v4 as uuidv4 } from "uuid";
import { ETower } from "../entities/tower";

const PLACEHOLDERTOWER = "towerPlacement";
export const usePlaceTowerSystem: GameSystemFunction = (
  gameObjects: GameObjects,
  active: boolean
) => {
  const mouseClicked = useMouseClick();
  const mousePosition = useMousePosition();

  if (gameObjects[PLACEHOLDERTOWER] && !active) {
    delete gameObjects[PLACEHOLDERTOWER];
  }
  if (!gameObjects[PLACEHOLDERTOWER] && active) {
    gameObjects[PLACEHOLDERTOWER] = ETower();
    gameObjects[PLACEHOLDERTOWER].physics.position = mousePosition;
  }

  if (active) {
    gameObjects[PLACEHOLDERTOWER].physics.position = mousePosition;
    if (mouseClicked) {
      const guid = uuidv4();
      gameObjects[guid] = ETower();
      gameObjects[guid].physics.position = mousePosition;
    }
  }
};
