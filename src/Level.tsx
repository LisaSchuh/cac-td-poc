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

let prevGameState: GameState = {
  collisions: {},
  input: {
    mouseClicked: false,
    mousePosition: { x: 0, y: 0 },
  },
  crystals: 0,
  gameObjects: {},
};

export const levelSetup = () => {
  prevGameState.gameObjects["innerSanctuary"] = EInnerSanctuary();
  prevGameState.gameObjects["player"] = EPlayer();
};

let animationFrameId = 0;
export const levelStop = () => {
  window.cancelAnimationFrame(animationFrameId);
};

export function levelStart(tFrame: number) {
  animationFrameId = window.requestAnimationFrame(levelStart);

  let gameState: GameState = {
    collisions: {},
    input: {
      mouseClicked: false,
      mousePosition: { x: 0, y: 0 },
    },
    crystals: prevGameState.crystals,
    gameObjects: prevGameState.gameObjects,
  };
  gameState.input = doInput();
  gameState.collisions = doPhysics(gameState.gameObjects);
  gameState = doLogic(gameState, prevGameState);
  gameState = doPlaceTowerSystem(gameState);
  doDrawing(gameState.gameObjects);
  doStatusCommunication(gameState, prevGameState);

  prevGameState = gameState;
}
