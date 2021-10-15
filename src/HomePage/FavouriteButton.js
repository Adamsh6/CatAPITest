import React from "react";
import { Button, Icon } from "semantic-ui-react";

const FavouriteButton = (props) => {
  return (
    <div>
      <button onClick={props.handleToggleFavourite}>
        <Icon name="heart outline" />
      </button>
    </div>
  );
};

export default FavouriteButton;
