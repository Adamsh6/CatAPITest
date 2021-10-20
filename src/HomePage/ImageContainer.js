import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VoteButtons from "./VoteButtons";
import VoteCount from "./VoteCount";
import FavouriteButton from "./FavouriteButton";
import "./css/ImageContainer.css";

const ImageContainer = (props) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteId, setFavouriteId] = useState(undefined);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (props.imageData.favourite) {
      setIsFavourite(true);
      setFavouriteId(props.imageData.favourite.id);
    }
    setScore(props.score);
  }, [props.imageData, props.score]);

  const handleUpVote = () => {
    props.handleUpVote(props.imageData.id);
  };
  const handleDownVote = () => {
    props.handleDownVote(props.imageData.id);
  };

  const handleToggleFavourite = () => {
    isFavourite
      ? props.removeFavourite(favouriteId).then((response) => {
          if (response.isSuccessful) {
            setIsFavourite(false);
          }
        })
      : props.setFavourite(props.imageData.id).then((response) => {
          if (response.isSuccessful) {
            setIsFavourite(true);
            setFavouriteId(response.favouriteId);
          }
        });
  };

  return (
    <div className="ImageContainer">
      <FavouriteButton
        isFavourite={isFavourite}
        handleToggleFavourite={handleToggleFavourite}
      />

      <div className="image">
        <img src={props.imageData.url} alt="cat" className="catImage" />
      </div>
      <VoteCount score={score} />
      <VoteButtons
        handleUpVote={handleUpVote}
        handleDownVote={handleDownVote}
      />
    </div>
  );
};

export default ImageContainer;

ImageContainer.propTypes = {
  imageData: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
  removeFavourite: PropTypes.func.isRequired,
  setFavourite: PropTypes.func.isRequired,
  handleDownVote: PropTypes.func.isRequired,
  handleUpVote: PropTypes.func.isRequired,
};
