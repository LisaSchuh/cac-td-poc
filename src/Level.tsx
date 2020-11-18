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
import ReactDOM from "react-dom";
import React from "react";
import GameOver from "./ui/gameover";

function getInitGameState(): GameState {
  const initGameState = {
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
  return JSON.parse(JSON.stringify(initGameState));
}
let prevGameState: GameState = getInitGameState();

export const levelSetup = () => {
  addObject(prevGameState.gameObjects, EInnerSanctuary(), "innerSanctuary");
  addObject(prevGameState.gameObjects, EPlayer(), "player");
  addObject(prevGameState.gameObjects, EEnemySpawner());
};

let animationFrameId = 0;
export const levelStop = () => {
  window.cancelAnimationFrame(animationFrameId);
};

function restart() {
  prevGameState = getInitGameState();
  levelSetup();
  ReactDOM.unmountComponentAtNode(
    document.getElementById("gameover") as Element
  );
  levelStart(Date.now());
}
export function levelStart(tFrame: number) {
  if (handleGameOver()) return;

  animationFrameId = window.requestAnimationFrame(levelStart);
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
  gameState.toDelete.forEach((d) => {
    if (gameState.gameObjects[d]) {
      delete gameState.gameObjects[d];
    }
  });

  prevGameState = gameState;
}

function handleGameOver(): boolean {
  if (prevGameState.health <= 0) {
    levelStop();
    ReactDOM.render(
      <React.StrictMode>
        <GameOver onRestart={restart} />
      </React.StrictMode>,
      document.getElementById("gameover")
    );
    return true;
  }
  return false;
}
