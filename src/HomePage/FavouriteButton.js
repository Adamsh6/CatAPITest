import React from "react";
import { Button, Icon } from "semantic-ui-react";

const FavouriteButton = (props) => {
  return (
    <div>
      <Button onClick={props.handleDownVote}>
        <Icon name="heart outline" />
      </Button>
    </div>
  );
};

export default FavouriteButton;
