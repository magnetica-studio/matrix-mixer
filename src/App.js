import "./App.css";
import React, { useState, useEffect } from "react";
import core, { lib as el } from "./elementary-v0.9.7.plugin.js";

function App() {
  let [patchBay, setPatchBay] = useState([
    [1, 0],
    [1, 0],
  ]);

  let toggle = (i, j, value) => {
    // Duplicate our state to avoid in-place mutation
    const newBay = patchBay.map((x) => [...x]);

    // Update and write the new state
    newBay[i][j] = 1 - newBay[i][j];
    setPatchBay(newBay);
  };

  useEffect(async function () {
    core.render(
      ...patchBay.map(function (row, i) {
        return el.add(
          ...row.map(function (val, j) {
            let key = `pb${i}:${j}`;
            return el.mul(
              el.sm(el.const({ key, value: 0.2 * val })),
              el.in({ channel: j })
            );
          })
        );
      })
    );
  });

  return (
    <div className="px-8 py-4">
      <h1 className="text-gray-500">Patch Bay Demo</h1>
      <table className="border-collapse border border-gray-400">
        <tr>
          <td className="py-4 text-gray-500 font-semibold font-mono text-xs"></td>
          <td className="py-4 text-gray-500 font-semibold font-mono text-xs">
            <div className="transform -rotate-90">Input 0</div>
          </td>
          <td className="py-4 text-gray-500 font-semibold font-mono text-xs">
            <div className="transform -rotate-90">Input 1</div>
          </td>
        </tr>
        {patchBay.map(function (row, i) {
          return (
            <tr key={i}>
              <td className="px-2 text-gray-500 font-semibold font-mono text-xs">
                Output {i}
              </td>
              {row.map(function (cell, j) {
                return (
                  <td key={j} className="p-2 border border-gray-400">
                    <input
                      type="checkbox"
                      checked={cell === 1}
                      onInput={(e) => toggle(i, j, e.target.value)}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
