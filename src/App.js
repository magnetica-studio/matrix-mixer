import logo from './logo.svg';
import './App.css';
import React from 'react';
import core, {lib as el} from './elementary-v0.9.7.plugin.js'

let patchBay = [
  [0.5, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

core.render(...patchBay.map(function(row, i) {
  return el.add(...row.map(function(val, j) {
    let key = `pb${i}:${j}`;
    return el.mul(el.sm(el.const({key, value: 0.2 * val})), el.in({channel: j}));
  }));
}));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
