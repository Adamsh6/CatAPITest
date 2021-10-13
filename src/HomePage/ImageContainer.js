import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import VoteButtons from "./VoteButtons";
import VoteCount from "./VoteCount";
import FavouriteButton from "./FavouriteButton";
import api from "../api";
import "./css/ImageContainer.css";

const ImageContainer = (props) => {
  const handleUpVote = () => {
    console.log("UP Vote");
  };
  const handleDownVote = () => {
    console.log("Down Vote");
  };
  return (
    <div className="ImageContainer">
      <FavouriteButton />
      <img src={props.imageData.url} className="catImage" />
      <VoteButtons
        handleUpVote={handleUpVote}
        handleDownVote={handleDownVote}
      />
      <VoteCount />
    </div>
  );
};

export default ImageContainer;
