import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import EditProfile from "./EditProfile";

const setUp = (props = {}) => {
  const component = shallow(<EditProfile {...props} />);
  return component;
};

describe("EditProfile", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("EditProfile should render without errors", () => {
    const wrapper = findByTestAtrr(component, "EditProfile");
    expect(wrapper.length).toBe(1);
  });

  it("displyName should render without errors", () => {
    const wrapper = findByTestAtrr(component, "displyName");
    expect(wrapper.length).toBe(1);
  });

  it("email should render without errors", () => {
    const wrapper = findByTestAtrr(component, "email");
    expect(wrapper.length).toBe(1);
  });

  it("gender should render without errors", () => {
    const wrapper = findByTestAtrr(component, "gender");
    expect(wrapper.length).toBe(1);
  });

  it("dateOfBirth should render without errors", () => {
    const wrapper = findByTestAtrr(component, "dateOfBirth");
    expect(wrapper.length).toBe(1);
  });

  it("country should render without errors", () => {
    const wrapper = findByTestAtrr(component, "country");
    expect(wrapper.length).toBe(1);
  });

  it("password should render without errors", () => {
    const wrapper = findByTestAtrr(component, "password");
    expect(wrapper.length).toBe(1);
  });
  it("cancle button should render without errors", () => {
    const wrapper = findByTestAtrr(component, "cancle");
    expect(wrapper.length).toBe(1);
  });
  it("submit button should render without errors", () => {
    const wrapper = findByTestAtrr(component, "submit");
    expect(wrapper.length).toBe(1);
  });

  it("UserExperinceForm should render without errors", () => {
    const wrapper = findByTestAtrr(component, "UserExperinceForm");
    expect(wrapper.length).toBe(1);
  });
});
