import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import Following from "./Following";

const setUp = (props = {}) => {
  const component = shallow(<Following {...props} />);
  return component;
};

describe("Following", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Following should render without errors", () => {
    const wrapper = findByTestAtrr(component, "Following");
    expect(wrapper.length).toBe(1);
  });
});
