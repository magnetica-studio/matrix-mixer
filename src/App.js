import "./App.css";
import React, { useState, useEffect } from "react";
import {
  el,
  ElementaryPluginRenderer as core
} from "@nick-thompson/elementary";

let outputs = [
  {
    name: "L",
    receive: [
      {
        gain: 1.0,
        mute: false,
      },
      {
        gain: 0.0,
        mute: false,
      },
    ],
  },
  {
    name: "R",
    receive: [
      {
        gain: 0.0,
        mute: false,
      },
      {
        gain: 1.0,
        mute: false,
      },
    ],
  },
];

const App = ({ loadEvent }) => {
  useEffect(() => {
    core.render(
      ...outputs.map(output => {
        return el.add(
          ...output.receive.map(input => input.gain * (input.mute ? 0 : 1)).map((gain, inputIndex) => {
            let key = `pb${output.name}:${inputIndex}`;
            return el.mul(
              el.sm(el.const({ key, value: gain })),
              el.in({ channel: inputIndex })
            );
          })
        );
      })
    );
  });

  return (
    <table>
      <tr>
        {outputs[0].receive.map((input, index) => (
          <th>input {index}</th>
        ))}
      </tr>
      {outputs.map((output) => (
        <tr>
          {output.receive.map((input) => (
            <td>
              <div>gain: {input.gain}</div>
              <div>mute: {input.mute}</div>
            </td>
          ))}
          <td>{output.name}</td>
        </tr>
      ))}
    </table>
  );
};

export default App;
