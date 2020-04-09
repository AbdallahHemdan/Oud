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
      {countryList.map(country => (
        <option value={country.code}>{country.name}</option>
      ))}
    </select>
  );
}
export default Country;
