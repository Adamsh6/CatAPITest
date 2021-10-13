import React, { useEffect, useState } from "react";
import api from "../api";
import ImageContainer from "./ImageContainer";

const HomeContainer = () => {
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    api.getImages().then((response) => {
      setImageData(response);
    });
  }, []);

  const imageList = (imageData) => {
    imageData.map((singleImageData) => (
      <ImageContainer imageData={singleImageData} />
    ));
  };

  return (
    <div className="HomeContainer">
      <ImageContainer imageData={imageData[0]} />
    </div>
  );
};

export default HomeContainer;
