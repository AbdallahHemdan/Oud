import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import PublicPlaylists from "./PublicPlaylists";

const setUp = (props = {}) => {
  const component = shallow(<PublicPlaylists {...props} />);
  return component;
};

describe("PublicPlaylists", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("PublicPlaylists should render without errors", () => {
    const wrapper = findByTestAtrr(component, "PublicPlaylists");
    expect(wrapper.length).toBe(1);
  });
});
