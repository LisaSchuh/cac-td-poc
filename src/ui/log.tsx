import "./log.css";
import React, { useState, useEffect } from "react";
import { registerLogEvent } from "../general/events";

function Log() {
  const [messages, setMessages] = useState<string[]>([]);
  const [fadeOutMessage, setFadeOutMessage] = useState<ConstrainBoolean[]>([]);

  useEffect(() => {
    registerLogEvent((message: string) => {
      messages.push(message);
      setMessages([...messages]);
      fadeOutMessage[messages.length - 1] = false;
      setFadeOutMessage([...fadeOutMessage]);

      setTimeout(() => {
        fadeOutMessage[messages.length - 1] = true;
        setFadeOutMessage([...fadeOutMessage]);

        setTimeout(() => {
          messages.splice(0, 1);
          setMessages([...messages]);
        }, 1000);
      }, 2000);
    });
  });

  return (
    <>
      {messages.reverse().map((m, index) => {
        const pStyle = {
          bottom: `${1.5 * (index + 1) + 2}em`,
        };
        return (
          <div
            className={`log__element ${
              fadeOutMessage[index] ? "log__element--fadeout" : ""
            }`}
            style={pStyle}
          >
            {m}
          </div>
        );
      })}
    </>
  );
}

export default Log;
