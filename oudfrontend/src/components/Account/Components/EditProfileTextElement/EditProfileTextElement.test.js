import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import EditProfileTextElement from "./EditProfileTextElement";

const setUp = (props = {}) => {
  const component = shallow(<EditProfileTextElement {...props} />);
  return component;
};

describe("EditProfileTextElement", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("EditProfileTextElement should render without errors", () => {
    const wrapper = findByTestAtrr(component, "EditProfileTextElement");
    expect(wrapper.length).toBe(1);
  });

  it("metaData should render without errors", () => {
    const wrapper = findByTestAtrr(component, "metaData");
    expect(wrapper.length).toBe(1);
  });

  it("feild should render without errors", () => {
    const wrapper = findByTestAtrr(component, "feild");
    expect(wrapper.length).toBe(1);
  });
});
