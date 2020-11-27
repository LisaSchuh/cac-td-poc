import { IPosition, GameObject, GameState } from "../general/types";
import Konva from "konva";
import { registerActionToggledEvent } from "../general/events";

const width = Math.min(125, window.innerWidth * 0.25);

let autoBeatRate = 0;
let track = "";
function setTrack(newSound: string) {
  if (!track) {
    track = newSound;
  } else if (track && !track.match(newSound)) {
    track += newSound;
  }
  playTrack();
}

// COPIED FROM: https://stackoverflow.com/questions/46926033/create-seamless-loop-of-audio-web
const actx = new AudioContext();
//let srcNode: AudioBufferSourceNode; // global so we can access them from handlers
// Sets up a new source node as needed as stopping will render current invalid
function playLoop(abuffer: AudioBuffer) {
  let srcNode = actx.createBufferSource(); // create audio source
  srcNode.buffer = abuffer; // use decoded buffer
  srcNode.connect(actx.destination); // create output
  srcNode.loop = true; // takes care of perfect looping
  srcNode.start(); // play...
}

function playTrack() {
  let audioSrc = "";

  if (track.match("voicepad")) {
    audioSrc = "sounds/dts_voicepad.wav";
  } else if (track.match("drums")) {
    audioSrc = "sounds/dts_drums.wav";
  }
  // start audio
  if (audioSrc) {
    fetch(audioSrc, { mode: "cors" })
      .then(function (resp) {
        return resp.arrayBuffer();
      })
      .then((buffer: ArrayBuffer) => {
        actx.decodeAudioData(buffer, playLoop);
      });
  }
}

let currentAction = "";
registerActionToggledEvent((action, active2) => {
  currentAction = action;
});

export const EInnerSanctuary = (): GameObject => {
  return {
    visuals: VInnerSanctuary,
    physics: {
      position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
      velocity: 0,
      direction: { x: 0, y: 0 },
      radius: width,
    },
    logic: function (id: string, state: GameState, prevState: any) {
      state.crystals +=
        (autoBeatRate * ((state.tFrame - prevState.tFrame) / 1000)) / 5;
      if (currentAction === "buyvoicepad" && state.crystals >= 200) {
        state.crystals -= 200;
        autoBeatRate += 10;
        currentAction = "";
        setTrack("voicepad");
      }
      if (currentAction === "buydrums" && state.crystals >= 500) {
        state.crystals -= 500;
        autoBeatRate += 50;
        currentAction = "";
        setTrack("drums");
      }
      if (
        state.input.mouseClicked &&
        state.collisions["player"].filter((c) => c === id).length > 0
      ) {
        state.crystals += 10;
        let audio = new Audio("sounds/LSC_Kick_03.wav");
        audio.play();
      }
      return state;
    },
    type: "INNERSANCTUARY",
  };
};

function VInnerSanctuary(position: IPosition) {
  return new Konva.Circle({
    x: position.x,
    y: position.y,
    radius: width,
    cornerRadius: 80,
    stroke: "#f946AB",
    shadowBlur: 20,
    shadowColor: "#f946AB",
    fillLinearGradientColorStops: [0, "#ffd319", 1, "#ff784a"],
    fillLinearGradientStartPoint: { x: 0, y: -20 },
    fillLinearGradientEndPoint: { x: 0, y: 100 },
    strokeWidth: 1,
  });
}
