import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import GetPremium from "./GetPremium";

const setUp = (props = {}) => {
  const component = shallow(<GetPremium {...props} />);
  return component;
};

describe("GetPremium", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("getPremium should render without errors", () => {
    const wrapper = findByTestAtrr(component, "getPremium");
    expect(wrapper.length).toBe(1);
  });

  it("getPremiumUpperContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "getPremiumUpperContainer");
    expect(wrapper.length).toBe(1);
  });
  it("getPremiumLowerContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "getPremiumLowerContainer");
    expect(wrapper.length).toBe(1);
  });
});
