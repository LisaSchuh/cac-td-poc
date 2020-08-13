import "./Level.css";

import { EInnerSanctuary } from "./entities/innerSanctuary";
import { EPlayer } from "./entities/player";
import { GameState } from "./general/types";
import { doPlaceTowerSystem } from "./systems/placeTower";
import { doLogic } from "./systems/logic";
import { doPhysics } from "./systems/physics";
import { doDrawing } from "./systems/drawing";
import { doStatusCommunication } from "./systems/statusCommunication";
import { doInput } from "./systems/input";
import { EEnemySpawner } from "./entities/enemieSpawner";
import { addObject } from "./general/engine";

let prevGameState: GameState = {
  collisions: {},
  input: {
    mouseClicked: false,
    mousePosition: { x: 0, y: 0 },
  },
  tFrame: performance.now(),
  crystals: 0,
  health: 1000,
  gameObjects: {},
  toDelete: [],
};

let init = false;
export const levelSetup = () => {
  addObject(prevGameState.gameObjects, EInnerSanctuary(), "innerSanctuary");
  addObject(prevGameState.gameObjects, EPlayer(), "player");
  addObject(prevGameState.gameObjects, EEnemySpawner());
  init = true;
};

let animationFrameId = 0;
export const levelStop = () => {
  window.cancelAnimationFrame(animationFrameId);
};

export function levelStart(tFrame: number) {
  animationFrameId = window.requestAnimationFrame(levelStart);
  if (init) {
    let gameState: GameState = {
      collisions: {},
      input: {
        mouseClicked: false,
        mousePosition: { x: 0, y: 0 },
      },
      tFrame: performance.now(),
      crystals: prevGameState.crystals,
      health: prevGameState.health,
      gameObjects: prevGameState.gameObjects,
      toDelete: [],
    };
    gameState.input = doInput();
    gameState.collisions = doPhysics(gameState.gameObjects);
    gameState = doLogic(gameState, prevGameState);
    gameState = doPlaceTowerSystem(gameState);
    doDrawing(gameState.gameObjects);
    doStatusCommunication(gameState, prevGameState);

    //cleanup unused objs
    gameState.toDelete.forEach((d) => delete gameState.gameObjects[d]);

    prevGameState = gameState;
  }
}
