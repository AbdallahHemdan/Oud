import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import UpperContainer from "./UpperContainer";

const setUp = (props = {}) => {
  const component = shallow(<UpperContainer {...props} />);
  return component;
};

describe("UpperContainer", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("UpperContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "UpperContainer");
    expect(wrapper.length).toBe(1);
  });
  it("avatar should render without errors", () => {
    const wrapper = findByTestAtrr(component, "avatar");
    expect(wrapper.length).toBe(1);
  });
  it("avatarImage should render without errors", () => {
    const wrapper = findByTestAtrr(component, "avatarImage");
    expect(wrapper.length).toBe(1);
  });
  it("userName should render without errors", () => {
    const wrapper = findByTestAtrr(component, "userName");
    expect(wrapper.length).toBe(1);
  });
  it("profile-links should render without errors", () => {
    const wrapper = findByTestAtrr(component, "profile-links");
    expect(wrapper.length).toBe(1);
  });
});
