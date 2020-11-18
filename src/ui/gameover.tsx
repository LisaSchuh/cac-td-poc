import "./gameover.css";
import React from "react";

interface IGameOverProps {
  onRestart: () => void;
}

function GameOver(props: IGameOverProps) {
  return (
    <div className="gameover">
      <h1 className="gameover__text gameover__text--big">Game Over</h1>
      <p className="gameover__text">
        You are officially the worst defender since .... well you are the only
        defender but still!
      </p>
      <button className="gameover__button" onClick={props.onRestart}>
        Try again?
      </button>
    </div>
  );
}

export default GameOver;
