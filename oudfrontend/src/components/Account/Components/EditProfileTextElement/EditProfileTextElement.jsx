import React from "react";
import "./EditProfileTextElement.css";

/**
 * @type {Function}
 * @param {*} props
 * @returns {HTMLElement} Edit Profile Element feild such that email ,display name with [type="text"]
 */
function EditProfileTextElement(props) {
  return (
    <div className="EditProfileTextElement" data-test="EditProfileTextElement">
      <p className="editMetaData" data-test="metaData">
        {props.metaData}
      </p>
      <input
        data-test="feild"
        type={props.type}
        id={props.id}
        name={props.name}
        className={props.class}
        value={props.value}
        disabled={props.disable}
        onChange={props.handeler}
        required
      />
    </div>
  );
}
export default EditProfileTextElement;
