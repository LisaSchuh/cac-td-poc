import "./Level.css";
import React, { useState, useEffect } from "react";

import { Stage, Layer } from "react-konva";
import { EInnerSanctuary } from "./entities/innerSanctuary";
import { EPlayer } from "./entities/player";
import Hud from "./hud/hud";
import { GameObjects } from "./general/types";
import { usePlaceTowerSystem } from "./systems/placeTower";
import { useLogic } from "./systems/logic";

let prevGameState = {
  collisions: {},
  mouseClicked: false,
  mousePosition: { x: 0, y: 0 },
  crystals: 0,
};

function Level() {
  const [gameObjects, setGameObjects] = useState<GameObjects>({});
  const [placeTowerActive, setPlaceTowerActive] = useState<boolean>(false);
  const [initLevel, setinitLevel] = useState<boolean>(false);

  useEffect(() => {
    if (!initLevel) {
      gameObjects["innerSanctuary"] = EInnerSanctuary();
      gameObjects["player"] = EPlayer();
      setGameObjects(gameObjects);
      setinitLevel(false);
    }
  }, [initLevel, gameObjects]);

  usePlaceTowerSystem(gameObjects, placeTowerActive);
  prevGameState = useLogic(gameObjects, {}, prevGameState);

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        className="base-level"
      >
        <Layer>
          {Object.keys(gameObjects).map((s) => {
            return (
              gameObjects[s]?.visuals(
                gameObjects[s]?.physics.position ?? { x: 0, y: 0 }
              ) ?? <></>
            );
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
        statusBar={["Crystals " + prevGameState.crystals]}
      />
    </>
  );
}

export default Level;
