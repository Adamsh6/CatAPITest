import React from "react";
import { Icon } from "semantic-ui-react";

import "./TopMenuBar.css";

const TopMenuBar = () => {
  return (
    <div className="TopMenuBar">
      <h1>RATE A CAT</h1>
      <Icon name="picture" />
      <Icon name="upload" />
    </div>
  );
};

export default TopMenuBar;
