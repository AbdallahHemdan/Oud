import React from "react";
import { shallow } from "enzyme";
import ArtistUserView from "./ArtistUserView";
import { findByTestAttr } from "./../../utils/index";
const setup = (artistId) => {
  const component = shallow(<ArtistUserView artistId={artistId} />);
  return component;
};

describe("artist from user view component", () => {
  let component;
  beforeEach(() => {
    component = setup("1");
  });

  it("check rendering artist user view container correctly", () => {
    const wrapper = findByTestAttr(component, "artist-user-view");
    expect(wrapper.length).toBe(1);
  });

  it("check rendering artist upper container correctly", () => {
    const wrapper = findByTestAttr(component, "artist-upper-container");
    expect(wrapper.length).toBe(1);
  });

  it("check rendering artist lower container correctly", () => {
    const wrapper = findByTestAttr(component, "artist-lower-container");
    expect(wrapper.length).toBe(1);
  });
});
