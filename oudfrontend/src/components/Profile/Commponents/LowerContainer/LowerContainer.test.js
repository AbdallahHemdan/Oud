import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import LowerContainer from "./LowerContainer";

const setUp = (props = {}) => {
  const component = shallow(<LowerContainer {...props} />);
  return component;
};

describe("LowerContainer", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("LowerContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "LowerContainer");
    expect(wrapper.length).toBe(1);
  });
  it("profileOverview should render without errors", () => {
    const wrapper = findByTestAtrr(component, "profileOverview");
    expect(wrapper.length).toBe(1);
  });
  it("profilePublicPlaylists should render without errors", () => {
    const wrapper = findByTestAtrr(component, "profilePublicPlaylists");
    expect(wrapper.length).toBe(1);
  });
  it("following should render without errors", () => {
    const wrapper = findByTestAtrr(component, "following");
    expect(wrapper.length).toBe(1);
  });
  it("followers should render without errors", () => {
    const wrapper = findByTestAtrr(component, "followers");
    expect(wrapper.length).toBe(1);
  });
  it("defualt-profile-page should render without errors", () => {
    const wrapper = findByTestAtrr(component, "defualt-profile-page");
    expect(wrapper.length).toBe(1);
  });
});
