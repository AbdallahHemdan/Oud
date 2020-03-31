import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import UserExperinceForm from "./UserExperinceForm";

const setUp = (props = {}) => {
  const component = shallow(<UserExperinceForm {...props} />);
  return component;
};

describe("UserExperinceForm", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("theForm should render without errors", () => {
    const wrapper = findByTestAtrr(component, "theForm");
    expect(wrapper.length).toBe(1);
  });
});
