import {
  GameState,
  IPosition,
  GameObject,
  DummyPhysics,
  DummyVisuals,
} from "../general/types";
import { EBasicEnemy } from "./basicEnemy";
import { addObject, getObject } from "../general/engine";

const timeBetweenEnemies = 1000;
let lastEnemySpawnTimeSpan = 0;

export const EEnemySpawner = (): GameObject => {
  return {
    visuals: DummyVisuals,
    physics: DummyPhysics,
    logic: doSpawnEnemies,
    type: "ENEMYSPAWNER",
  };
};

const doSpawnEnemies = (id: string, gameState: GameState): GameState => {
  //Spawn new Enemies
  if (gameState.tFrame - lastEnemySpawnTimeSpan > timeBetweenEnemies) {
    const newEnemy = addObject(gameState.gameObjects, EBasicEnemy());
    getObject(
      gameState.gameObjects,
      newEnemy
    ).physics.position = getRandomPosition();
    lastEnemySpawnTimeSpan = gameState.tFrame;
  }

  return gameState;
};

function getRandomPosition(): IPosition {
  const side = getRandomInt(4);
  if (side === 0) {
    // TOP
    return { x: getRandomInt(window.innerWidth - 10), y: 10 };
  }
  if (side === 1) {
    // BOTTOM
    return {
      x: getRandomInt(window.innerWidth - 10),
      y: window.innerHeight - 10,
    };
  }
  if (side === 2) {
    // LEFT
    return { x: 10, y: getRandomInt(window.innerHeight - 10) };
  }
  if (side === 3) {
    // RIGHT
    return {
      x: window.innerWidth - 10,
      y: getRandomInt(window.innerHeight - 10),
    };
  }
  return { x: 0, y: 0 };
}
function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
