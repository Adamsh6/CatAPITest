import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "semantic-ui-react";

const UploadContainer = (props) => {
  const fileInput = useRef(null);

  const handleUpload = (files) => {
    console.log(files[0]);
    props.api.uploadImage(files[0]);
  };
  return (
    <div>
      <Input
        type="file"
        onChange={(e) => {
          if (e.target.files) handleUpload(e.target.files);
        }}
      />
      {/* <Button onClick={(e) => fileInput.current && fileInput.current.click()} /> */}
    </div>
  );
};

export default UploadContainer;

UploadContainer.propTypes = {
  api: PropTypes.shape({
    uploadImage: PropTypes.func.isRequired,
  }),
};
