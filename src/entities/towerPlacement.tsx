import React from "react";
import { useMousePosition } from "../general/useMousePosition";
import Tower from "./tower";

function TowerPlacement() {
  const position = useMousePosition();

  return <Tower {...position} />;
}

export default TowerPlacement;
