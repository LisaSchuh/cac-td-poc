import React from "react";
import { Rect } from "react-konva";
import { IPosition } from "../general/types";

const width = 40;
const height = 40;

function Tower(props: IPosition) {
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

export default Tower;
