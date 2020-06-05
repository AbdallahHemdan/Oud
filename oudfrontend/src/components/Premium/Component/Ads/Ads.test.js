import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import Ads from "./Ads";

const setUp = (props = {}) => {
  const component = shallow(<Ads {...props} />);
  return component;
};

describe("Ads", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Ads should render without errors", () => {
    const wrapper = findByTestAtrr(component, "Ads");
    expect(wrapper.length).toBe(1);
  });
});
