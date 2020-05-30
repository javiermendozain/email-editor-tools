// Dependencies
import React from "react";
import ReactDOM from "react-dom";

// Component
import App from "./App";

// Setting
import withReduxFeatures from "./config/redux/withReduxFeatures";
import * as serviceWorker from "./config/worker/serviceWorker";

if (process.env.NODE_ENV === "production") {
  // Show Alert Stop
  console.clear();
  console.log("%c 👀¡Detente!", "color: red; font-size: 60px;");
  console.info(
    `Esta función del navegador está pensada para desarrolladores. Si alguien te indicó que copiaras y pegaras algo aquí para habilitar una función de Claro Gaming o para 👮‍♂️'hackear'👨‍⚖️ la cuenta de alguien, se trata de un fraude. 💥`
  );
}

// DOM
const rootElement = document.getElementById("root");

/** Wrap App component with store providers */
const WrappedApp = withReduxFeatures(App);

ReactDOM.render(<WrappedApp />, rootElement);

/**
 * If you want your app to work offline and load faster,
 * you can change unregister() to register() below.
 * Note this comes with some pitfalls.
 * @see https://bit.ly/CRA-PWA
 */
serviceWorker.register();
