import { render } from "@testing-library/react";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UploadContainer from "./UploadPage/UploadContainer";
import HomeContainer from "./HomePage/HomeContainer";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
        <Route path="/upload">
          <UploadContainer />
        </Route>
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
