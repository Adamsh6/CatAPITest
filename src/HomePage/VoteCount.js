import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";

import "./css/VoteCount.css";

const VoteCount = (props) => {
  return (
    <Container text fluid className="VoteCount">
      <p>Score: {props.score}</p>
    </Container>
  );
};

export default VoteCount;

VoteCount.propTypes = {
  score: PropTypes.number.isRequired,
};
