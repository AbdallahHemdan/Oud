import React from "react";
import PageContainer from "../PageContainer/PageContainer";
import ImageContainer from "../ImageContainer/ImageContainer";

import { Route } from "react-router-dom";
import "./MainContainer.css";

/**
 * Main container : this is the container of the whole page
 * @type {Function}
 * @returns {jsx} image container (in account overview and page container)
 * <MainContainer/>
 */
function MainContainer() {
  return (
    <div className="mainContainer" data-test="mainContainer">
      <Route
        data-test="ImageContainer"
        exact
        path={`/account/accountOverview`}
        component={ImageContainer}
      />

      <PageContainer data-test="PageContainer" />
    </div>
  );
}

export default MainContainer;
