import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ElementaryPluginRenderer as core } from "@nick-thompson/elementary";

core.on("load", (e) => {
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
