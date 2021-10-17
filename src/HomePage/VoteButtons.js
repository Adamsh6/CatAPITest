import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

import "./css/VoteButtons.css";

const VoteButtons = (props) => {
  return (
    <div className="VoteButtons">
      <Button onClick={props.handleDownVote}>Down Vote</Button>
      <Button onClick={props.handleUpVote}>Up Vote</Button>
    </div>
  );
};

export default VoteButtons;

VoteButtons.propTypes = {
  handleUpVote: PropTypes.func.isRequired,
  handleDownVote: PropTypes.func.isRequired,
};
