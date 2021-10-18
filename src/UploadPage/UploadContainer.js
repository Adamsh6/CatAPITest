import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Message, Loader } from "semantic-ui-react";
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
    console.log(files[0]);
    await props.api.uploadImage(files[0]).then((response) => {
      if (!response.isSuccessful) {
        setErrorMessage(response.message);
      } else {
        history.push("/home");
      }
    });
    setLoading(false);
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
