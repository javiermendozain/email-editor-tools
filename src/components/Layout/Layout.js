// Dependencies
import * as React from "react";

import { Footer, Header, Content } from "../";

import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default Layout;
