import React from "react";

import PageContainer from "./PageContainer";
import ImageContainer from "./ImageContainer";
import { Route, useRouteMatch } from "react-router-dom";
import "../CssFiles/MainContainer.css";
/* this is the container of the whole page */

function MainContainer() {
  let { url, path } = useRouteMatch();

  return (
    <div className="mainContainer">
      <Route
        exact
        path={`${path}/accountOverview`}
        component={ImageContainer}
      />

      <PageContainer />
    </div>
  );
}

export default MainContainer;
