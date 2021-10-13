import React from "react";
import { Button } from "semantic-ui-react";

const VoteButtons = (props) => {
  return (
    <div>
      <Button onClick={props.handleDownVote}>Down Vote</Button>
      <Button onClick={props.handleUpVote}>Up Vote</Button>
    </div>
  );
};

export default VoteButtons;
