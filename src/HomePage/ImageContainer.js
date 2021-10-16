import React, { useEffect, useState } from "react";
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
      <img src={props.imageData.url} alt="cat" className="catImage" />
      <VoteButtons
        handleUpVote={handleUpVote}
        handleDownVote={handleDownVote}
      />
      <VoteCount score={score} />
    </div>
  );
};

export default ImageContainer;
