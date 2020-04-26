import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { levelSetup, levelStart } from "./Level";
import ReactDOM from "react-dom";
import React from "react";
import { LevelUI } from "./LevelUI";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

document.addEventListener(
  "DOMContentLoaded",
  () => {
    levelSetup();
  },
  false
);

levelStart(Date.now());

ReactDOM.render(
  <React.StrictMode>
    <LevelUI />
  </React.StrictMode>,
  document.getElementById("root")
);
