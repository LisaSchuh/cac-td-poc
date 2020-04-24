import React from "react";

import { Rect } from "react-konva";
import { IPosition, GameObject, GameState } from "../general/types";

const width = 100;
const height = 100;

export const EInnerSanctuary = (): GameObject => {
  return {
    visuals: (position: IPosition) => {
      return <VInnerSanctuary {...position}></VInnerSanctuary>;
    },
    physics: {
      position: {
        x: window.innerWidth / 2 - 50,
        y: window.innerHeight / 2 - 50,
      },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: function (state: GameState) {
      if (state.mouseClicked) {
        state.crystals += 10;
      }
      return state;
    },
  };
};

function VInnerSanctuary(position: IPosition) {
  return (
    <Rect
      x={position.x}
      y={position.y}
      width={width}
      height={height}
      fill={"#fff951"}
      cornerRadius={5}
      shadowBlur={10}
      shadowColor={"#fff951"}
    />
  );
}
