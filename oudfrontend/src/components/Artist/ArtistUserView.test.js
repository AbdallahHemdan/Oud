import React from "react";
import { shallow, mount } from "enzyme";
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

  it("check addToPlaylist utility", () => {
    const component = shallow(<ArtistUserView artistId="1" />);
    let displayAdd = component.state().displayAdd;
    expect(displayAdd).toBe(false);
    const instance = component.instance();
    instance.addToPlaylist();
    displayAdd = component.state().displayAdd;
    expect(displayAdd).toBe(true);
  });

  it("check closeAddToPlaylist utility", () => {
    const component = shallow(<ArtistUserView artistId="1" />);
    component.setState({
      displayAdd: true,
    });
    component.instance().closeAddToPlaylist();
    const displayAdd = component.state().displayAdd;
    expect(displayAdd).toBe(false);
  });

  it("check rendering AddToPlaylist component correctly", () => {
    const wrapper = findByTestAttr(component, "artist-top-tracks");
    expect(wrapper.length).toBe(0);
  });

  it("check rendering the whole component correctly", () => {
    const wrapper = findByTestAttr(component, "artist-user-view-page");
    expect(wrapper.length).toBe(1);
  });

  it("check upper container conditional class", () => {
    const wrapper = findByTestAttr(component, "UpperContainer");
    expect(wrapper.length).toBe(0);
    expect(component.find(".upperContainerProfile").exists()).toBe(false);
  });
});
