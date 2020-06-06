import {
  GameObjects,
  ICollisions,
  PhysicObject,
  IPosition,
} from "../general/types";

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
  if (rectB.dimension && rectA.dimension) {
    return checkForRectangleInRectangleOverlap(rectA, rectB);
  }
  if (rectA.radius && rectB.dimension) {
    return checkForRectangleInCircleOverlap(rectA, rectB);
  }
  if (rectA.dimension && rectB.radius) {
    return checkForRectangleInCircleOverlap(rectB, rectA);
  }
  return false;
};

const checkForRectangleInRectangleOverlap = (
  rectA: PhysicObject,
  rectB: PhysicObject
): boolean => {
  if (rectB.dimension && rectA.dimension) {
    if (
      rectA.position.x < rectB.position.x + rectB.dimension.width &&
      rectA.position.x + rectA.dimension.width > rectB.position.x &&
      rectA.position.y < rectB.position.y + rectB.dimension.height &&
      rectA.position.y + rectA.dimension.height > rectB.position.y
    ) {
      return true;
    }
  }
  return false;
};

const checkForRectangleInCircleOverlap = (
  circle: PhysicObject,
  rect: PhysicObject
): boolean => {
  if (circle.radius && rect.dimension) {
    return (
      checkPointInCircle(rect.position, circle) &&
      checkPointInCircle(
        { x: rect.position.x + rect.dimension.width, y: rect.position.y },
        circle
      ) &&
      checkPointInCircle(
        { x: rect.position.x, y: rect.position.y + rect.dimension.height },
        circle
      ) &&
      checkPointInCircle(
        {
          x: rect.position.x + rect.dimension.width,
          y: rect.position.y + rect.dimension.height,
        },
        circle
      )
    );
  }
  return false;
};

const checkPointInCircle = (
  point: IPosition,
  circle: PhysicObject
): boolean => {
  return (
    Math.pow(point.x - circle.position.x, 2) +
      Math.pow(point.y - circle.position.y, 2) <
    Math.pow(circle.radius ?? 0, 2)
  );
};
