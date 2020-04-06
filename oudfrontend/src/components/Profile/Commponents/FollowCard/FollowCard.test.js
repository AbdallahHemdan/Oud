import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import FollowCard from "./FollowCard";

const setUp = (props = {}) => {
  const component = shallow(<FollowCard {...props} />);
  return component;
};

describe("FollowCard", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("FollowCard should render without errors", () => {
    const wrapper = findByTestAtrr(component, "FollowCard");
    expect(wrapper.length).toBe(1);
  });
  it("followCardImage should render without errors", () => {
    const wrapper = findByTestAtrr(component, "followCardImage");
    expect(wrapper.length).toBe(1);
  });
  it("followCardName should render without errors", () => {
    const wrapper = findByTestAtrr(component, "followCardName");
    expect(wrapper.length).toBe(1);
  });
  it("followCardFollowers should render without errors", () => {
    const wrapper = findByTestAtrr(component, "followCardFollowers");
    expect(wrapper.length).toBe(1);
  });
});
