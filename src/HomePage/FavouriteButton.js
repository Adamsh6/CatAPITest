import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import "./css/FavouriteButton.css";

const FavouriteButton = (props) => {
  return (
    <div className="FavouriteButton">
      <button onClick={props.handleToggleFavourite}>
        <Icon
          name={props.isFavourite ? "heart" : "heart outline"}
          size="large"
        />
      </button>
    </div>
  );
};

export default FavouriteButton;

FavouriteButton.propTypes = {
  handleToggleFavourite: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
};
