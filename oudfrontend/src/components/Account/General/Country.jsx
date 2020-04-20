import React from "react";

let countryList = require("iso-3166-country-list");

function Country(props) {
  return (
    <select
      id="country"
      name="country"
      className={props.class}
      value={props.default}
      onChange={props.handeler}
    >
      {countryList.map(
        country =>
          country.name !== "Israel" && (
            <option value={country.code}>
              {country.code === "PS" ? "Palestine" : country.name}
            </option>
          )
      )}
    </select>
  );
}
export default Country;
