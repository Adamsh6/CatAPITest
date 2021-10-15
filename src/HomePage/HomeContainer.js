import React, { useEffect, useState } from "react";
import ImageContainer from "./ImageContainer";

const HomeContainer = (props) => {
  const [imagesData, setImagesData] = useState(undefined);
  const [scoreData, setScoreData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    props.api.getImages(currentPage).then((response) => {
      setImagesData(response);
    });
  }, [currentPage]);

  useEffect(() => {
    props.api.getVotes().then((response) => {
      setScoreData(response);
    });
  }, []);

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
      />
    ));
  };

  return (
    <div className="HomeContainer">
      {imagesData && scoreData && imageList(imagesData, scoreData)}
    </div>
  );
};

export default HomeContainer;
