import React from "react";
import { Icon } from "semantic-ui-react";

import "./TopMenuBar.css";

const TopMenuBar = () => {
  return (
    <div className="TopMenuBar">
      <h1>RATE A CAT</h1>
      <Icon name="picture" size="big" />
      <Icon name="upload" size="big" />
    </div>
  );
};

export default TopMenuBar;
