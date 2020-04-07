import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import MainContainer from "./MainContainer";

const setUp = (props = {}) => {
  const component = shallow(<MainContainer {...props} />);
  return component;
};

describe("MainContainer", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("mainContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "mainContainer");
    expect(wrapper.length).toBe(1);
  });
  it("ImageContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "ImageContainer");
    expect(wrapper.length).toBe(1);
  });

  it("PageContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "PageContainer");
    expect(wrapper.length).toBe(1);
  });
});
