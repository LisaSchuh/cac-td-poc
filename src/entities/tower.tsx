import {
  IPosition,
  GameObject,
  GameState,
  DummyLogic,
  DummyVisuals,
  IHash,
} from "../general/types";
import Konva from "konva";
import { getObject, deleteObject } from "../general/engine";
import { sendLogEvent } from "../general/events";

const width = 40;
const height = 40;
const range = 100;
const upkeepCost = 5;
let lastUpkeeptPaid = 0;
const timeBetweenUpkeepPayment = 1000;

export const ETower = (): IHash<GameObject> => {
  return {
    main: {
      visuals: DummyVisuals,
      physics: {
        position: { x: 0, y: 0 },
        velocity: 0,
        direction: { x: 0, y: 0 },
        radius: 0,
      },
      logic: doTowerLogic,
      type: "TOWER",
    },
    Range: ERangeTower(),
    Visual: EVisibleTower(),
  };
};

const doTowerLogic = (id: string, gameState: GameState): GameState => {
  const main = getObject(gameState.gameObjects, id);
  const range = getObject(gameState.gameObjects, `${id}_Range`);
  const visual = getObject(gameState.gameObjects, `${id}_Visual`);

  //Update Position with Main Obj
  if (
    main.physics.position.x !== visual.physics.position.x &&
    main.physics.position.x !== visual.physics.position.y
  ) {
    visual.physics.position = main.physics.position;
    range.physics.position = main.physics.position;
  }

  //Check for enemy in range
  if (gameState.collisions[`${id}_Range`]) {
    gameState.collisions[`${id}_Range`].forEach((f) => {
      if (getObject(gameState.gameObjects, f).type === "ENEMY") {
        deleteObject(gameState, f);
      }
    });
  }

  if (gameState.tFrame - lastUpkeeptPaid > timeBetweenUpkeepPayment) {
    if (gameState.crystals >= upkeepCost) {
      gameState.crystals -= upkeepCost;
    } else {
      deleteObject(gameState, id);
      sendLogEvent("oh no... where are the beats to sustain the towers??");
    }
    lastUpkeeptPaid = gameState.tFrame;
  }
  return gameState;
};

const ERangeTower = (): GameObject => {
  return {
    visuals: DummyVisuals,
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      radius: range,
    },
    logic: DummyLogic,
    type: "TOWER",
  };
};
const EVisibleTower = (): GameObject => {
  return {
    visuals: VVisibleTower,
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: DummyLogic,
    type: "TOWER",
  };
};
function VVisibleTower(props: IPosition) {
  return new Konva.Rect({
    x: props.x,
    y: props.y,
    width,
    height,
    // fillLinearGradientColorStops: [0, "#ffd319", 1, "#ff2975"],
    // fillLinearGradientStartPoint: { x: 0, y: 10 },
    // fillLinearGradientEndPoint: { x: 0, y: 40 },
    // fill: "rgb(20, 187, 175)",
    fill: "#5da4a6",
    shadowBlur: 2,
    shadowColor: "white",
    cornerRadius: 0,
    stroke: "#6df1d8 ",
    strokeWidth: 1,
  });
}
