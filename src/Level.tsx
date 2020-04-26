import "./Level.css";
import React, { useState, useEffect } from "react";

import { Stage, Layer } from "react-konva";
import { EInnerSanctuary } from "./entities/innerSanctuary";
import { EPlayer } from "./entities/player";
import Hud from "./hud/hud";
import { GameObjects } from "./general/types";
import { doPlaceTowerSystem } from "./systems/placeTower";
import { doLogic } from "./systems/logic";
import { doPhysics } from "./systems/physics";
import { doDrawing } from "./systems/drawing";
import { doStatusCommunication } from "./systems/statusCommunication";
import { cursorTo } from "readline";

let prevGameState = {
  collisions: {},
  mouseClicked: false,
  mousePosition: { x: 0, y: 0 },
  crystals: 0,
};

let gameObjects: GameObjects = {};

export const levelSetup = () => {
  gameObjects["innerSanctuary"] = EInnerSanctuary();
  gameObjects["player"] = EPlayer();
};

let animationFrameId = 0;
export const levelStop = () => {
  window.cancelAnimationFrame(animationFrameId);
};

export function levelStart(tFrame: number) {
  animationFrameId = window.requestAnimationFrame(levelStart);

  const collisions = doPhysics(gameObjects);
  let newGameState = doLogic(gameObjects, collisions, prevGameState);
  newGameState = doPlaceTowerSystem(gameObjects, newGameState);
  doDrawing(gameObjects);
  doStatusCommunication(newGameState, prevGameState);

  prevGameState = newGameState;
}

export function LevelHud() {
  const [crystals, setCrystals] = useState<number>(0);

  useEffect(() => {
    document.body.addEventListener("statusChanged", (e: any) => {
      setCrystals(e.detail.crystals);
    });
  }, []);

  return (
    <>
      <Hud
        actionBar={[
          {
            text: "+",
            action: (active) => {
              let event = new CustomEvent("actionToggled", {
                detail: {
                  name: "placeTower",
                  active: true,
                },
              });
              document.body.dispatchEvent(event);
            },
          },
        ]}
        statusBar={[`Crystals ${crystals}`]}
      />
    </>
  );
}
