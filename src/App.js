import logo from './logo.svg';
import './App.css';
import React from 'react';
import core, {lib as el} from './elementary-v0.9.7.plugin.js'

core.render(
  el.mul(0.0, el.cycle(440)),
  el.mul(0.0, el.cycle(441)),
);

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
