import { useCallback, useRef } from "react";
import { SET_GAIN, TOGGLE_MUTE } from "./reducers";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const Cell = ({ dispatch, input, inputIndex, outputIndex }) => {
  const lastPoint = useRef({ x: 0, y: 0 });

  const handleDrag = useCallback(
    (e) => {
      e.preventDefault();
      const offsetFromStart = {
        x: e.clientX - lastPoint.current.x,
        y: e.clientY - lastPoint.current.y,
      };
      lastPoint.current = {
        x: e.clientX,
        y: e.clientY,
      };
      const SENSITIVITY = 0.005;
      const newValue = clamp(
        input.gain + (offsetFromStart.x - offsetFromStart.y) * SENSITIVITY,
        0,
        1
      );
      dispatch({
        type: SET_GAIN,
        payload: {
          value: newValue,
          inputIndex,
          outputIndex,
        },
      });
    },
    [dispatch, inputIndex, outputIndex, input]
  );

  return (
    <div
      onDrag={handleDrag}
      style={{ background: "cyan" }}
      draggable
    >
      <div>gain: {input.gain.toFixed(2)}</div>
      <label>mute</label>
      <input
        type="checkbox"
        onChange={() =>
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
    </div>
  );
};

export default Cell;
