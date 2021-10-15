import React, { ChangeEvent } from "react";
import { Button, Input } from "semantic-ui-react";

const UploadContainer = (props) => {
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
    </div>
  );
};

export default UploadContainer;
