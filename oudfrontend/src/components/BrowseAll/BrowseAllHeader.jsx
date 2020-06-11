import React from "react";

/**
 * @author Abdallah Hemdan
 *
 *
 * Functional component to display the header of the component
 */
const BrowseAllHeader = () => {
  return (
    <div className="row" data-testid="category-header">
      <div className="sub-header" data-testid="category-title">
        Browse all
      </div>
    </div>
  );
};

export default BrowseAllHeader;
