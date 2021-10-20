import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const PaginationButtons = (props) => {
  const handleBackPage = () => {
    props.setCurrentPage(props.page - 1);
  };
  const handleNextPage = () => {
    props.setCurrentPage(props.page + 1);
  };
  return (
    <div className="PaginationButtons">
      <Button onClick={handleBackPage} disabled={props.page === 0}>
        Back
      </Button>
      <Button onClick={handleNextPage} disabled={props.isLastPage}>
        Next
      </Button>
    </div>
  );
};

export default PaginationButtons;

PaginationButtons.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
};
