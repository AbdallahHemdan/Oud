import React from "react";
import { shallow } from "enzyme";
import Artist from "./Artist";
const setup = () => {
  const props = {
    match: {
      params: {
        artistId: "1",
      },
    },
  };
  const component = shallow(<Artist {...props} />);
  return component;
};

describe("artist snapshot test", () => {
  it("renders correctly", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
