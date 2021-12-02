import "./App.css";
import React, { useReducer, useEffect } from "react";
import {
  el,
  ElementaryPluginRenderer as core,
} from "@nick-thompson/elementary";
import Cell from "./Cell";
import { reducer, initialState } from "./reducers";

const App = ({ loadEvent }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    core.render(
      ...state.map((output) => {
        return el.add(
          ...output.receive
            .map((input) => input.gain * (input.mute ? 0 : 1))
            .map((gain, inputIndex) => {
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
    <table unselectable="on" style={{ WebkitUserSelect: "none" }}>
      <thead>
        <tr>
          <th />
          {state[0].receive.map((_, index) => (
            <th key={index}>input {index}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {state.map((output, outputIndex) => (
          <tr key={output.name}>
            <td>{output.name}</td>
            {output.receive.map((input, inputIndex) => (
              <td key={inputIndex}>
                <Cell
                  dispatch={dispatch}
                  input={input}
                  inputIndex={inputIndex}
                  outputIndex={outputIndex}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
