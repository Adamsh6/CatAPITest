import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Message, Loader } from "semantic-ui-react";
import { withRouter, useHistory } from "react-router-dom";

import "./UploadContainer.css";

const UploadContainer = (props) => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const fileInput = useRef(null);
  const history = useHistory();

  const handleUpload = async (files) => {
    setErrorMessage(undefined);
    setLoading(true);
    const file = files[0];
    if (isFileImage(file)) {
      console.log(files[0]);
      await props.api.uploadImage(file).then((response) => {
        if (!response.isSuccessful) {
          setErrorMessage(response.message);
          setLoading(false);
        } else {
          history.push("/home");
        }
      });
    } else {
      setErrorMessage(
        "Invalid File Type: Please ensure the file is an image and try again"
      );
      setLoading(false);
    }
  };

  const isFileImage = (file) => {
    return file && file["type"].split("/")[0] === "image";
  };

  return (
    <div className="UploadContainer">
      <Loader active={loading} />
      <Message error compact hidden={!errorMessage} size={"large"}>
        {errorMessage}
      </Message>
      {!loading && (
        <div>
          <input
            type="file"
            name="file"
            ref={fileInput}
            onChange={(e) => {
              if (e.target.files) handleUpload(e.target.files);
            }}
          />
          <Button
            onClick={(e) => fileInput.current && fileInput.current.click()}
          >
            Upload File
          </Button>
        </div>
      )}
    </div>
  );
};

export default withRouter(UploadContainer);

UploadContainer.propTypes = {
  api: PropTypes.shape({
    uploadImage: PropTypes.func.isRequired,
  }),
};
