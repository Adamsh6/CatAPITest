import React from "react";
import { Icon } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";

import "./TopMenuBar.css";

const TopMenuBar = () => {
  return (
    <div className="TopMenuBar">
      <h1>RATE A CAT</h1>
      <Link to="/">
        <Icon name="picture" size="big" />{" "}
      </Link>
      <Link to="/upload">
        <Icon name="upload" size="big" />
      </Link>
    </div>
  );
};

export default withRouter(TopMenuBar);
