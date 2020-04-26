import { getMouseClick } from "../general/useMouseClick";
import { getMousePosition } from "../general/useMousePosition";
import { IInput } from "../general/types";

export const doInput = (): IInput => {
  return {
    mouseClicked: getMouseClick(),
    mousePosition: getMousePosition(),
  };
};
