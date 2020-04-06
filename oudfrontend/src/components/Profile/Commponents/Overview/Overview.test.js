import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import Overview from "./Overview";

const setUp = (props = {}) => {
  const component = shallow(<Overview {...props} />);
  return component;
};

describe("Overview", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Overview should render without errors", () => {
    const wrapper = findByTestAtrr(component, "Overview");
    expect(wrapper.length).toBe(1);
  });
  it("title should render without errors", () => {
    const wrapper = findByTestAtrr(component, "title");
    expect(wrapper.length).toBe(1);
  });
  it("PublicPlaylists should render without errors", () => {
    const wrapper = findByTestAtrr(component, "PublicPlaylists");
    expect(wrapper.length).toBe(1);
  });
});
