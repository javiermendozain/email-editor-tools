// Dependencies
import React from "react";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";

// components
import { PrivateRouter } from "./components";

// Routes
import routes from "./routes";

// Assets
import "./assets/scss/app.css";

const App = () => {
  const routesMap = routes.map((route, i) =>
    route.protected ? (
      <PrivateRouter key={i} {...route} />
    ) : (
      <Route key={i} {...route} />
    )
  );

  return <Switch>{routesMap}</Switch>;
};

export default hot(module)(App);
