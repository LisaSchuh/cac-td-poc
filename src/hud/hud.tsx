import "./hud.css";
import React, { useState } from "react";

export interface IHudButton {
  text: string;
  action: (active: boolean) => void;
  toggled?: boolean;
}

export interface IHudProps {
  actionBar: IHudButton[];
  statusBar: string[];
}

function Hud(props: IHudProps) {
  const [buttonToggleState, setButtonToggleState] = useState<boolean[]>(
    props.actionBar.map((aB) => (aB.toggled ? true : false))
  );

  function toggleButtonCallAction(btn: IHudButton, index: number) {
    buttonToggleState[index] = !buttonToggleState[index];
    setButtonToggleState(buttonToggleState);
    btn.action(buttonToggleState[index]);
  }
  return (
    <>
      <div className="status-bar">
        {props.statusBar.map((text) => {
          return <div className="status-bar__element">{text}</div>;
        })}
      </div>

      <div className="action-bar">
        {props.actionBar.map((button, index) => {
          return (
            <button
              className={
                "action-bar__element" +
                (buttonToggleState[index] ? " action-bar__element--active" : "")
              }
              onClick={() => {
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
