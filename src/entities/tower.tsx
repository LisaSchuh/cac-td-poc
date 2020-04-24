import React from "react";
import { Rect } from "react-konva";
import { IPosition, GameObject, GameState } from "../general/types";

const width = 40;
const height = 40;

export const ETower = (): GameObject => {
  return {
    visuals: (position: IPosition) => {
      return <VTower {...position} />;
    },
    physics: {
      position: { x: 0, y: 0 },
      velocity: 0,
      direction: { x: 0, y: 0 },
      dimension: { width, height },
    },
    logic: (state: GameState) => state,
  };
};
function VTower(props: IPosition) {
  return (
    <Rect
      x={props.x}
      y={props.y}
      width={width}
      height={height}
      fill="#bbbbbb"
      shadowBlur={4}
      shadowColor={"#dedede"}
      cornerRadius={5}
    />
  );
}
