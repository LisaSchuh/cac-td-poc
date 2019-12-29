import { IPosition } from "@models/types";
import { drawRec } from "../engine/graphic";

const color = "#276E91";
const width = 20;
const height = 40;

export const draw = (pos: IPosition) => {
  drawRec(pos, color, width, height);
};
