import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import ChangePassword from "./ChangePassword";

const setUp = (props = {}) => {
  const component = shallow(<ChangePassword {...props} />);
  return component;
};

describe("ChangePassword", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("ChangePassword should render without errors", () => {
    const wrapper = findByTestAtrr(component, "ChangePassword");
    expect(wrapper.length).toBe(1);
  });
  it("ChangePassword-Card should render without errors", () => {
    const wrapper = findByTestAtrr(component, "ChangePassword-Card");
    expect(wrapper.length).toBe(1);
  });

  it("current-password should render without errors", () => {
    const wrapper = findByTestAtrr(component, "current-password");
    expect(wrapper.length).toBe(1);
  });
  it("new-password should render without errors", () => {
    const wrapper = findByTestAtrr(component, "new-password");
    expect(wrapper.length).toBe(1);
  });
  it("repeat-new-password should render without errors", () => {
    const wrapper = findByTestAtrr(component, "repeat-new-password");
    expect(wrapper.length).toBe(1);
  });
  it("cancle should render without errors", () => {
    const wrapper = findByTestAtrr(component, "cancle");
    expect(wrapper.length).toBe(1);
  });
  it("submit should render without errors", () => {
    const wrapper = findByTestAtrr(component, "submit");
    expect(wrapper.length).toBe(1);
  });
  it("UserExperinceForm should render without errors", () => {
    const wrapper = findByTestAtrr(component, "UserExperinceForm");
    expect(wrapper.length).toBe(1);
  });
});
