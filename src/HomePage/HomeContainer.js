import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ImageContainer from "./ImageContainer";
import { Loader, Message } from "semantic-ui-react";
import "./css/HomeContainer.css";
import PaginationButtons from "./PaginationButtons";

const pageLimit = 16;

const HomeContainer = (props) => {
  const [imagesData, setImagesData] = useState(undefined);
  const [scoreData, setScoreData] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    setErrorMessage(undefined);
    props.api.getImages(currentPage, pageLimit).then((response) => {
      console.log(response);
      if (response.isSuccessful) {
        setImagesData(response.data);
      } else {
        setErrorMessage(response.message);
      }
    });
  }, [currentPage, props.api]);

  useEffect(() => {
    setErrorMessage(undefined);
    props.api.getVotes().then((response) => {
      console.log(response);
      if (response.isSuccessful) {
        setScoreData(response.data);
      } else {
        setErrorMessage(response.message);
      }
    });
  }, [props.api]);

  const handleUpVote = (id) => {
    setErrorMessage(undefined);
    props.api.incrementVote(id, true).then((response) => {
      if (response.isSuccessful) {
        let newScoreData = Object.assign({}, scoreData);
        newScoreData[id] = scoreData[id] ? scoreData[id] + 1 : 1;
        setScoreData(newScoreData);
      } else {
        setErrorMessage(response.message);
      }
    });
  };

  const handleDownVote = (id) => {
    setErrorMessage(undefined);
    props.api.incrementVote(id, false).then((response) => {
      if (response.isSuccessful) {
        let newScoreData = Object.assign({}, scoreData);
        newScoreData[id] = scoreData[id] ? scoreData[id] - 1 : -1;
        setScoreData(newScoreData);
      } else {
        setErrorMessage(response.message);
      }
    });
  };

  const imageList = (imagesData, scoreData) => {
    return imagesData.map((imageData, index) => (
      <ImageContainer
        index={index}
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
      <Message
        error
        compact
        hidden={!errorMessage}
        size={"large"}
        onDismiss={() => setErrorMessage(undefined)}
      >
        {errorMessage}
      </Message>
      <Loader active={!errorMessage && (!imagesData || !scoreData)} />
      {imagesData && scoreData && (
        <>
          <div className="image-list">{imageList(imagesData, scoreData)}</div>
          <PaginationButtons
            page={currentPage}
            isLastPage={imagesData.length < pageLimit ? true : false}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
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
