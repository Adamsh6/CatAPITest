import React from "react";
import { Button, Icon } from "semantic-ui-react";

const FavouriteButton = (props) => {
  return (
    <div>
      <button onClick={props.handleToggleFavourite}>
        <Icon
          name={props.isFavourite ? "heart" : "heart outline"}
          colour="red"
        />
      </button>
    </div>
  );
};

export default FavouriteButton;
