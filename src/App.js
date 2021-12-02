import "./App.css";
import React, { useReducer, useEffect } from "react";
import {
  el,
  ElementaryPluginRenderer as core,
} from "@nick-thompson/elementary";

let initialState = [
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

const TOGGLE_MUTE = "TOGGLE_MUTE";
const SET_GAIN = "SET_GAIN";

const toggleMute = (state, action) =>
  state.map((output, outputIndex) =>
    outputIndex !== action.payload.outputIndex
      ? output
      : {
          ...output,
          receive: output.receive.map((input, inputIndex) =>
            inputIndex !== action.payload.inputIndex
              ? input
              : {
                  ...input,
                  mute: !input.mute,
                }
          ),
        }
  );

const setGain = (state, action) => {
  // TODO
  return state;
};

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_MUTE:
      return toggleMute(state, action);
    case SET_GAIN:
      return setGain(state, action);
    default:
      throw new Error(`Unhandled action dispatched: ${action.type}`);
  }
};

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
    <table>
      <tr>
        <th />
        {state[0].receive.map((_, index) => (
          <th>input {index}</th>
        ))}
      </tr>
      {state.map((output, outputIndex) => (
        <tr>
          <td>{output.name}</td>
          {output.receive.map((input, inputIndex) => (
            <td>
              <div>gain: {input.gain}</div>
              <label>mute</label>
              <input
                type="checkbox"
                onClick={() =>
                  dispatch({
                    type: TOGGLE_MUTE,
                    payload: {
                      inputIndex,
                      outputIndex,
                    },
                  })
                }
                checked={input.mute}
              />
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default App;
