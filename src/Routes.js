import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UploadContainer from "./UploadPage/UploadContainer";
import HomeContainer from "./HomePage/HomeContainer";
import api from "./api";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeContainer api={api} />
        </Route>
        <Route path="/upload">
          <UploadContainer api={api} />
        </Route>
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
