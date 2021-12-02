import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ElementaryPluginRenderer as core } from "@nick-thompson/elementary";

core.on("load", (e) => {
  if (e.numInputChannels < 1 || e.numOutputChannels < 1) {
    // Window.alert is not working
    window.alert("Unsupported track: this track has too small number of channels")
    console.warn("Unsupported track: this track has too small number of channels")
  }
  ReactDOM.render(
    <React.StrictMode>
      <App loadEvent={e} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

core.initialize();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
