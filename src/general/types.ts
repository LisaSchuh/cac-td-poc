export interface IPosition {
  x: number;
  y: number;
}

export interface IHash<T> {
  [key: string]: T;
}
export type GameSystemFunction = (
  gameObjects: GameObject,
  remove: boolean
) => void;
export type GameSystem = IHash<GameSystemFunction>;
export type GameObject = IHash<JSX.Element | null>;
