import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import WhyGoPremium from "./WhyGoPremium";

const setUp = (props = {}) => {
  const component = shallow(<WhyGoPremium {...props} />);
  return component;
};

describe("WhyGoPremium", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("goPremium should render without errors", () => {
    const wrapper = findByTestAtrr(component, "goPremium");
    expect(wrapper.length).toBe(1);
  });

  it("goPremiumUpperContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "goPremiumUpperContainer");
    expect(wrapper.length).toBe(1);
  });
  it("goPremiumLowerContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "goPremiumLowerContainer");
    expect(wrapper.length).toBe(1);
  });
  it("goPremiumFooter should render without errors", () => {
    const wrapper = findByTestAtrr(component, "goPremiumFooter");
    expect(wrapper.length).toBe(1);
  });
});
