import React from "react";
import ReactDom from "react-dom/client";

import App from "./App/App";

import './assets/reset.css';
import './assets/style.css';

const root =  ReactDom.createRoot(document.querySelector('.root'))

root.render(<App/>)