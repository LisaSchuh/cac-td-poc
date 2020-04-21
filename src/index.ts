import { IPosition } from "@models/types";
import { draw as towerDraw } from "./actors/tower";

import { getScreenWidth } from "@engine/constants";
import { start } from "@engine/instance";

const towers: IPosition[] = [];
let floatingTower: IPosition = { x: 0, y: 100 };


interface IEntity { 
}

interface ITower extends IEntity, IDrawable {}

interface IScene {
  entities: IEntity[];
  components: IComponent[];
}

interface IComponent {}
interface IActionableComponent<TData, TResult> extends IComponent{
    action: (data:TData) => TResult;
}

interface IDrawComponent extends IActionableComponent<IDrawable, void> {}

interface IDrawRectangleComponent extends IDrawComponent {
  action: (object: IDrawable) => void;
}

interface IDrawable {
  position: IPosition;
  color: string;
}

interface ISystem {
  process: (scene:IScene) => void;
}

//draw component
export const drawBasicSprite = (object: IDrawable) =>
{};

declare type DrawComponent= (object:IDrawable) => void;

const drawSystem = (scene:IScene) => {
  components.forEach(c => c());
}

const draw = () => {
  towers.forEach(towerDraw);
  towerDraw(floatingTower);
};

start([draw]);

loop(progress, obj) {

  draw(scene)

  checkstate()
    init add mapetc. addfloatable.physics.subscribe(controller)
    
  input mousemove
    moveFloatable
  input mousedown
    addTower
      return new IDrawable
                onphysicschange update drawable
             new IPhysics
  loop(porgress, obj)
}