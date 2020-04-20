import React from "react";
import ellipsis from "../../assets/images/icons/ellipsis.png";
function Options(props) {
  return (
    <div class="dropdown">
      <div
        className="artist-ellipsis-container"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <button className="ellipsis-icon" data-testid="artist-option-menu">
          <img src={ellipsis} alt="Show Options" className="ellipsis-img" />
        </button>
      </div>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="/">
          Action
        </a>
        <a class="dropdown-item" href="/">
          Another action
        </a>
        <a class="dropdown-item" href="/">
          Something else here
        </a>
      </div>
    </div>
  );
}
export default Options;
