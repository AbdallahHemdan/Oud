import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import ImageContainer from "./ImageContainer";

const setUp = (props = {}) => {
  const component = shallow(<ImageContainer {...props} />);
  return component;
};

describe("ImageContainer", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("imageContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "imageContainer");
    expect(wrapper.length).toBe(1);
  });
  it("getPremium should render without errors", () => {
    const wrapper = findByTestAtrr(component, "getPremium");
    expect(wrapper.length).toBe(1);
  });

  it("iphoneImage should render without errors", () => {
    const wrapper = findByTestAtrr(component, "iphoneImage");
    expect(wrapper.length).toBe(1);
  });
});
