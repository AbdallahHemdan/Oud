import React from "react";

import "../CssFiles/EditProfileTextElement.css";

function EditProfileTextElement(props) {
  return (
    <div className="EditProfileTextElement">
      <p className="editMetaData">{props.metaData}</p>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        className={props.class}
        defaultValue={props.value}
        disabled={props.disable}
        onChange={props.handeler}
        required
      />
    </div>
  );
}
export default EditProfileTextElement;
