import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

import "./css/PaginationButtons.css";

const PaginationButtons = (props) => {
  return (
    <div className="PaginationButtons">
      <Button onClick={props.handleBackPage} disabled={props.page === 0}>
        Back
      </Button>
      <Button onClick={props.handleNextPage} disabled={props.page === lastPage}>
        Next
      </Button>
    </div>
  );
};

export default PaginationButtons;

PaginationButtons.propTypes = {
  handleUpVote: PropTypes.func.isRequired,
  handleDownVote: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number,
};
