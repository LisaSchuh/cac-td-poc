import { IPosition, GameObject, GameState } from "../general/types";
import Konva from "konva";
import {
  normalizeVector,
  scaleVector,
  getVectorBetweenPoints,
  addVectors,
} from "../general/vectorMath";
import { deleteObject } from "../general/engine";

const width = 15;
const height = 20;

export const EBasicEnemy = (): GameObject => {
  return {
    visuals: VBasicEnemy,
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: LBasicEnemy,
    type: "ENEMY",
  };
};

function LBasicEnemy(
  this: GameObject,
  id: string,
  state: GameState,
  prevState?: GameState
): GameState {
  let self = this;
  const targetVector = state.gameObjects["innerSanctuary"].physics.position;
  if (
    state.collisions["innerSanctuary"] &&
    state.collisions["innerSanctuary"].filter((f) => f === id).length > 0
  ) {
    state.health -= 5;
    deleteObject(state, id);
    return state;
  }
  const directionalVector = normalizeVector(
    scaleVector(
      getVectorBetweenPoints(self.physics.position, targetVector),
      (state.tFrame - (prevState?.tFrame ?? 0)) / 1000
    )
  );
  self.physics.position = addVectors(self.physics.position, directionalVector);

  return state;
}

function VBasicEnemy(props: IPosition) {
  return new Konva.Shape({
    sceneFunc: function (context, shape) {
      context.beginPath();
      context.moveTo(props.x, props.y);
      context.lineTo(props.x + width, props.y + 5);
      context.lineTo(props.x + width / 2, props.y - height);
      context.closePath();

      // (!) Konva specific method, it is very important
      context.fillStrokeShape(shape);
    },
    fill: "#5c2c6d ",
    strokeWidth: 1,
    stroke: "#f946AB",
    cornerRadius: 2,
  });
}
