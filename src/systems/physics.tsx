import { GameObjects, ICollisions, PhysicObject } from "../general/types";

export const doPhysics = (gameObjects: GameObjects): ICollisions => {
  const collisions: ICollisions = {};
  Object.keys(gameObjects).forEach((a) => {
    collisions[a] = Object.keys(gameObjects)
      .map((b) => {
        if (a !== b) {
          if (checkForOverlap(gameObjects[a].physics, gameObjects[b].physics)) {
            return b;
          } else return "noCollision";
        }
        return "noCollision";
      })
      .filter((name) => name !== "noCollision");
  });
  return collisions;
};

const checkForOverlap = (rectA: PhysicObject, rectB: PhysicObject): boolean => {
  if (
    rectA.position.x < rectB.position.x + rectB.dimension.width &&
    rectA.position.x + rectA.dimension.width > rectB.position.x &&
    rectA.position.y < rectB.position.y + rectB.dimension.height &&
    rectA.position.y + rectA.dimension.height > rectB.position.y
  ) {
    return true;
  }
  return false;
};
