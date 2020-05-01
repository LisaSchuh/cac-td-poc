import { GameState, IPosition } from "../general/types";
import { EBasicEnemy } from "../entities/basicEnemy";
import { v4 as uuidv4 } from "uuid";
import { EProjectile } from "../entities/projectile";

const timeBetweenEnemies = 1000;
let lastEnemySpawnTimeSpan = 0;
let init = false;

export const doSpawnEnemies = (
  gameState: GameState,
  prevGameState: GameState
): GameState => {
  if (!init) {
    // for (let x = 0; x < 100; x++) {
    //   const guid = uuidv4();
    //   gameState.gameObjects[guid] = EProjectile();
    //   gameState.gameObjects[guid].physics.position = {
    //     x: getRandomInt(window.innerWidth - 10),
    //     y: getRandomInt(window.innerHeight - 10),
    //   };
    //   lastEnemySpawnTimeSpan = gameState.tFrame;
    // }
    // init = true;
  }
  //Spawn new Enemies
  if (gameState.tFrame - lastEnemySpawnTimeSpan > timeBetweenEnemies) {
    const guid = uuidv4();

    gameState.gameObjects[guid] = EBasicEnemy();
    gameState.gameObjects[guid].physics.position = getRandomPosition();
    lastEnemySpawnTimeSpan = gameState.tFrame;
  }

  //TODO: add Reference Id to self and move to basicEnemy
  //Move Existing Enemies
  const targetVector = gameState.gameObjects["innerSanctuary"].physics.position;

  Object.keys(gameState.gameObjects).forEach((s) => {
    const gO = gameState.gameObjects[s];
    if (gO.type === "ENEMY") {
      if (
        gameState.collisions["innerSanctuary"] &&
        gameState.collisions["innerSanctuary"].filter((f) => f === s).length > 0
      ) {
        console.log("hit");
        gameState.health -= 5;
        delete gameState.gameObjects[s];
        return;
      }
      const directionalVector = normalizeVector(
        scaleVector(
          getVectorBetweenPoints(gO.physics.position, targetVector),
          (gameState.tFrame - prevGameState.tFrame) / 1000
        )
      );
      gO.physics.position = addVectors(gO.physics.position, directionalVector);
    }
  });
  return gameState;
};

function normalizeVector(vec: IPosition): IPosition {
  const length = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.x, 2));
  return { x: vec.x / length, y: vec.y / length };
}
function addVectors(vec1: IPosition, vec2: IPosition): IPosition {
  return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
}

function scaleVector(vec1: IPosition, scale: number): IPosition {
  return { x: vec1.x * scale, y: vec1.y * scale };
}

function getVectorBetweenPoints(vec1: IPosition, vec2: IPosition): IPosition {
  return { x: vec2.x - vec1.x, y: vec2.y - vec1.y };
}
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
