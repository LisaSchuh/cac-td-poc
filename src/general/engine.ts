import { GameObjects, GameObject, MAINOBJ, GameState } from "./types";
import { v4 as uuidv4 } from "uuid";
import { IHash } from "./types";

export const addObject = (
  gos: GameObjects,
  go: GameObject,
  id?: string
): string => {
  id = id ? id : uuidv4();
  gos[id] = go;
  return id;
};

export const addMultiObject = (
  gos: GameObjects,
  mgo: IHash<GameObject>,
  id?: string
): string => {
  const generatedId = id ? id : uuidv4();
  Object.keys(mgo).forEach((subObject) => {
    gos[subObject === MAINOBJ ? generatedId : `${generatedId}_${subObject}`] =
      mgo[subObject];
  });
  return generatedId;
};

export const getObject = (gos: GameObjects, id: string): GameObject => {
  return gos[id];
};

export const deleteObject = (state: GameState, id: string) => {
  state.toDelete.push(id);
};
