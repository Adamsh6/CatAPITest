import React, { ChangeEvent } from "react";
import { Button, Input } from "semantic-ui-react";
import api from "../api";

const UploadContainer = () => {
  const handleUpload = (files) => {
    console.log(files[0]);
    api.uploadImage(files[0]);
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
