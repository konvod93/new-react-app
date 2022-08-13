import React from "react";
import ReactDOM from "react-dom";
import * as ReactDOMClient from 'react-dom/client';
import App from "./components/App.js";

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />, document.getElementById("root"));