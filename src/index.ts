import { IPosition } from "@models/types";
import { draw as towerDraw } from "./actors/tower";

import { getScreenWidth } from "@engine/utility";
import { addJob } from "@engine/instance";

const towers: IPosition[] = [];
let floatingTower: IPosition = { x: 0, y: 100 };

const draw = () => {
  towers.forEach(towerDraw);
  towerDraw(floatingTower);
};

addJob({
  work: draw
});

if (getScreenWidth() > 1025) {
} else {
}
