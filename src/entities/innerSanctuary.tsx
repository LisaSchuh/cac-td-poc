import React from "react";

import { Rect } from "react-konva";

const width = 100;
const height = 100;

function InnerSanctuary() {
  return (
    <Rect
      x={window.innerWidth / 2 - width / 2}
      y={window.innerHeight / 2 - height / 2}
      width={width}
      height={height}
      fill={"#fff951"}
      cornerRadius={5}
      shadowBlur={10}
      shadowColor={"#fff951"}
    />
  );
}

export default InnerSanctuary;
