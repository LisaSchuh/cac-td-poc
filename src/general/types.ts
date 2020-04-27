import Konva from "konva";

export interface IPosition {
  x: number;
  y: number;
}

export interface IDimension {
  width: number;
  height: number;
}

export interface IHash<T> {
  [key: string]: T;
}

export interface PhysicObject {
  position: IPosition;
  velocity: 0;
  direction: IPosition;
  dimension: IDimension;
}

export interface IInput {
  mousePosition: IPosition;
  mouseClicked: boolean;
}

export type ICollisions = IHash<string[]>;

export interface GameState {
  collisions: ICollisions;
  input: IInput;
  gameObjects: GameObjects;
  tFrame: number;
  crystals: number;
  health: number;
}

export interface GameObject {
  visuals: (position: IPosition) => Konva.Shape;
  physics: PhysicObject;
  logic: (state: GameState, prevState?: GameState) => GameState;
  type: string;
}

export type GameObjects = IHash<GameObject>;
