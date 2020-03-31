import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import HiddenSideBar from "./HiddenSideBar";

const setUp = (props = {}) => {
  const component = shallow(<HiddenSideBar {...props} />);
  return component;
};

describe("HiddenSideBar", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("hiddenSideBar should render without errors", () => {
    const wrapper = findByTestAtrr(component, "hiddenSideBar");
    expect(wrapper.length).toBe(1);
  });

  it("hiddenButton should render without errors", () => {
    const wrapper = findByTestAtrr(component, "hiddenButton");
    expect(wrapper.length).toBe(1);
  });

  it("hiddenToggle should render without errors", () => {
    const wrapper = findByTestAtrr(component, "hiddenToggle");
    expect(wrapper.length).toBe(1);
  });
  it("hiddenMenu should render without errors", () => {
    const wrapper = findByTestAtrr(component, "hiddenMenu");
    expect(wrapper.length).toBe(1);
  });
});
