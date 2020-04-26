import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { levelSetup, levelStart, LevelHud } from "./Level";
import ReactDOM from "react-dom";
import React from "react";

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
    <LevelHud />
  </React.StrictMode>,
  document.getElementById("root")
);
