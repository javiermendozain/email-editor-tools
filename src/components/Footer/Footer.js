// Dependencies
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";

// Libraries
import { DB_PATHS, isEmpty } from "../../helpers";

import "./footer.css";

const Footer = () => {
  return <footer className="m-5">Copyright - Javier mendoza</footer>;
};

export default Footer;
