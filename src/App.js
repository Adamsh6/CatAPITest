import React from "react";
import TopMenuBar from "./Layout/TopMenuBar";
import Routes from "./Routes";

import "./App.css";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div className="App">
      <TopMenuBar />
      <Routes />
    </div>
  );
}

export default App;
