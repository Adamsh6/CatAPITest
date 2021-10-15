import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import VoteButtons from "./VoteButtons";
import VoteCount from "./VoteCount";
import FavouriteButton from "./FavouriteButton";
import api from "../api";
import "./css/ImageContainer.css";

const ImageContainer = (props) => {
  const handleUpVote = () => {
    props.handleUpVote(props.imageData.id);
  };
  const handleDownVote = () => {
    props.handleDownVote(props.imageData.id);
  };
  return (
    <div className="ImageContainer">
      <FavouriteButton />
      <img src={props.imageData.url} className="catImage" />
      <VoteButtons
        handleUpVote={handleUpVote}
        handleDownVote={handleDownVote}
      />
      <VoteCount score={props.score} />
    </div>
  );
};

export default ImageContainer;
