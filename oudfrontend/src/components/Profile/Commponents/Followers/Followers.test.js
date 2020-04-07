import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import Followers from "./Followers";

const setUp = (props = {}) => {
  const component = shallow(<Followers {...props} />);
  return component;
};

describe("Followers", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Followers should render without errors", () => {
    const wrapper = findByTestAtrr(component, "Followers");
    expect(wrapper.length).toBe(1);
  });
});
