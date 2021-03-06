import "./hud.css";
import React, { useState, useEffect } from "react";
import {
  registerStatusChangedEvent,
  sendActionToggledEvent,
} from "../general/events";

export interface IHudButton {
  text: string;
  action: (active: boolean) => void;
  toggled?: boolean;
}

function Hud() {
  const [buttonToggleState, setButtonToggleState] = useState<boolean[]>([]);
  const [crystals, setCrystals] = useState<number>(0);
  const [health, setHealth] = useState<number>(10);

  const actionBar: IHudButton[] = [
    {
      text: "Add",
      action: (active) => {
        sendActionToggledEvent("placeTower", active);
      },
    },
    {
      text: "Buy Voicepad (200)",
      action: (active) => {
        sendActionToggledEvent("buyvoicepad", active);
      },
    },
    {
      text: "Buy Drums (500)",
      action: (active) => {
        sendActionToggledEvent("buydrums", active);
      },
    },
  ];

  useEffect(() => {
    registerStatusChangedEvent((crystals, health) => {
      setCrystals(crystals);
      setHealth(health);
    });
  }, []);

  const toggleButtonCallAction = (btn: IHudButton, index: number) => {
    buttonToggleState[index] = !buttonToggleState[index];
    setButtonToggleState([...buttonToggleState]);
    btn.action(buttonToggleState[index]);
  };
  return (
    <>
      <div className="status-bar">
        <div className="status-bar__element">{`80's vibe ${health}`}</div>
        <div className="status-bar__element">{`beats ${Math.round(
          crystals
        )}`}</div>
      </div>

      <div className="action-bar">
        {actionBar.map((button, index) => {
          return (
            <button
              className={
                "action-bar__element" +
                (buttonToggleState[index] ? " action-bar__element--active" : "")
              }
              onClick={(e) => {
                e.stopPropagation();
                toggleButtonCallAction(button, index);
              }}
            >
              {button.text}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Hud;
