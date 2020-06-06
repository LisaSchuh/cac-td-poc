import { IPosition } from "./types";

export const normalizeVector = (vec: IPosition): IPosition => {
  const length = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.x, 2));
  return { x: vec.x / length, y: vec.y / length };
};
export const addVectors = (vec1: IPosition, vec2: IPosition): IPosition => {
  return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
};

export const scaleVector = (vec1: IPosition, scale: number): IPosition => {
  return { x: vec1.x * scale, y: vec1.y * scale };
};

export const getVectorBetweenPoints = (
  vec1: IPosition,
  vec2: IPosition
): IPosition => {
  return { x: vec2.x - vec1.x, y: vec2.y - vec1.y };
};
