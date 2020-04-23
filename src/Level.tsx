import "./Level.css";
import React, { useState, useEffect } from "react";

import { Stage, Layer } from "react-konva";
import InnerSanctuary from "./entities/innerSanctuary";
import Hud from "./hud/hud";
import { GameSystem, GameObject, GameSystemFunction } from "./general/types";
import { usePlaceTowerSystem } from "./systems/placeTower";

function Level() {
  const [gameObjects, setGameObjects] = useState<GameObject>({});
  const [placeTowerActive, setPlaceTowerActive] = useState<boolean>(false);
  const [initLevel, setinitLevel] = useState<boolean>(false);

  useEffect(() => {
    if (!initLevel) {
      gameObjects["innerSanctuary"] = <InnerSanctuary></InnerSanctuary>;
      setGameObjects(gameObjects);
      setinitLevel(false);
    }
  }, [initLevel]);

  usePlaceTowerSystem(gameObjects, placeTowerActive);

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        className="base-level"
      >
        <Layer>
          {Object.keys(gameObjects).map((s) => {
            return gameObjects[s] ?? <></>;
          })}
        </Layer>
      </Stage>
      <Hud
        actionBar={[
          {
            text: "+",
            action: (active) => {
              setPlaceTowerActive(active);
            },
          },
        ]}
        statusBar={["Crystals 0"]}
      />
    </>
  );
}

export default Level;
