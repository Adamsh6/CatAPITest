import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ImageContainer from "./ImageContainer";
import { Loader } from "semantic-ui-react";
import "./css/HomeContainer.css";

const HomeContainer = (props) => {
  const [imagesData, setImagesData] = useState(undefined);
  const [scoreData, setScoreData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    props.api.getImages(currentPage).then((response) => {
      setImagesData(response);
    });
  }, [currentPage, props.api]);

  useEffect(() => {
    props.api.getVotes().then((response) => {
      setScoreData(response);
    });
  }, [props.api]);

  const handleUpVote = (id) => {
    props.api.incrementVote(id, true);
  };

  const handleDownVote = (id) => {
    props.api.incrementVote(id, false);
  };

  const imageList = (imagesData, scoreData) => {
    return imagesData.map((imageData) => (
      <ImageContainer
        key={imageData.id}
        imageData={imageData}
        handleDownVote={handleDownVote}
        handleUpVote={handleUpVote}
        score={scoreData[imageData.id] || 0}
        removeFavourite={props.api.removeFavourite}
        setFavourite={props.api.setFavourite}
      />
    ));
  };

  return (
    <div className="HomeContainer">
      <Loader active={!imagesData || !scoreData} />
      <div className="image-list">
        {imagesData && scoreData && imageList(imagesData, scoreData)}
      </div>
    </div>
  );
};

export default HomeContainer;

HomeContainer.propTypes = {
  api: PropTypes.shape({
    getImages: PropTypes.func.isRequired,
    getVotes: PropTypes.func.isRequired,
    removeFavourite: PropTypes.func.isRequired,
    setFavourite: PropTypes.func.isRequired,
    incrementVote: PropTypes.func.isRequired,
  }),
};
