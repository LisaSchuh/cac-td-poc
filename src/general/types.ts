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
export type GameSystemFunction = (
  gameObjects: GameObjects,
  remove: boolean
) => void;

export interface PhysicObject {
  position: IPosition;
  velocity: 0;
  direction: IPosition;
  dimension: IDimension;
}

export type ICollisions = IHash<string[]>;

export interface GameState {
  collisions: ICollisions;
  mousePosition: IPosition;
  mouseClicked: boolean;
  crystals: number;
}

export interface GameObject {
  visuals: (position: IPosition) => JSX.Element;
  physics: PhysicObject;
  logic: (state: GameState) => GameState;
}

export type GameObjects = IHash<GameObject>;
