import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import SideBar from "./SideBar";

const setUp = (props = {}) => {
  const component = shallow(<SideBar {...props} />);
  return component;
};

describe("SideBar", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("sideBar should render without errors", () => {
    const wrapper = findByTestAtrr(component, "sideBar");
    expect(wrapper.length).toBe(1);
  });
  it("userImg should render without errors", () => {
    const wrapper = findByTestAtrr(component, "userImg");
    expect(wrapper.length).toBe(1);
  });

  it("sideBarElements should render without errors", () => {
    const wrapper = findByTestAtrr(component, "sideBarElements");
    expect(wrapper.length).toBe(1);
  });
});
