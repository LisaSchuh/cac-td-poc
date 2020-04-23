import { useMouseClick } from "../general/useMouseClick";
import { useMousePosition } from "../general/useMousePosition";
import { GameObject, GameSystemFunction, GameSystem } from "../general/types";
import TowerPlacement from "../entities/towerPlacement";
import { v4 as uuidv4 } from "uuid";
import Tower from "../entities/tower";
import React from "react";

const PLACEHOLDERTOWER = "towerPlacement";
export const usePlaceTowerSystem: GameSystemFunction = (
  gameObjects: GameObject,
  active: boolean
) => {
  const mouseClicked = useMouseClick();
  const postition = useMousePosition();

  if (gameObjects[PLACEHOLDERTOWER] && !active) {
    gameObjects[PLACEHOLDERTOWER] = null;
  }
  if (!gameObjects[PLACEHOLDERTOWER] && active) {
    gameObjects[PLACEHOLDERTOWER] = <TowerPlacement />;
  }

  if (active) {
    if (mouseClicked) {
      gameObjects[uuidv4()] = <Tower {...postition} />;
    }
  }
};
