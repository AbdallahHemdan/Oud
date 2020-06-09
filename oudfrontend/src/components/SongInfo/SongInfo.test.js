import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import SongInfo from "./SongInfo.js";
import { findByTestAttr } from "./../../utils/index";

const setup = (props = {}) => {
  const component = shallow(<SongInfo.WrappedComponent {...props} />);
  return component;
};

describe("Song Info Component", () => {
  let component;
  beforeEach(() => {
    const album = {
      name: "test song info",
      artists: ["1"]
    };
    component = setup(album);
  });

  it("Should render Song Info container in right way", () => {
    const wrapper = findByTestAttr(component, "songInfo");
    expect(wrapper.length).toBe(1);
  });

  it("Should render close button in right way", () => {
    const wrapper = findByTestAttr(component, "songInfoCloseBtn");
    expect(wrapper.length).toBe(1);
  });
  it("Should render cancel button in right way", () => {
    const wrapper = findByTestAttr(component, "songInfoCancel");
    expect(wrapper.length).toBe(1);
  });
  it("Should render update name", () => {
    component = shallow(<SongInfo />);
    const wrapper = findByTestAttr(component, "formName");
    expect(wrapper.text()).toBe("Update Song");
  });
  it("Should render add name", () => {
    component = shallow(<SongInfo newSong={true} />);
    const wrapper = findByTestAttr(component, "formName");
    expect(wrapper.text()).toBe("Add Song");
  });
  it("Should render create button in right way", () => {
    const wrapper = findByTestAttr(component, "songInfoCreate");
    expect(wrapper.length).toBe(1);
  });

  it("Should render song info form in right way", () => {
    const wrapper = findByTestAttr(component, "songInfoForm");
    expect(wrapper.length).toBe(1);
  });

  it("Should render sonf info name field in right way", () => {
    const wrapper = findByTestAttr(component, "songInfoName");
    expect(wrapper.length).toBe(1);
  });

  it("Should render artists field in right way", () => {
    const wrapper = findByTestAttr(component, "songInfoArtists");
    expect(wrapper.length).toBe(1);
  });

  it("Should not render add file", () => {
    const wrapper = findByTestAttr(component, "songInfoBinary");
    expect(wrapper.length).toBe(0);
  });

  it("Should render add file", () => {
    component = shallow(<SongInfo newSong={true} />);
    const wrapper = findByTestAttr(component, "songInfoBinary");
    expect(wrapper.length).toBe(1);
  });
});
