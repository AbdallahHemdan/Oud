import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import CreateAlbum from "./CreateAlbum.js";
import { findByTestAttr } from "./../../utils/index";

const setup = (props = {}) => {
  const component = shallow(<CreateAlbum.WrappedComponent {...props} />);
  return component;
};

describe("Create Albuum Component", () => {
  let component;
  beforeEach(() => {
    const album = {
      name: "test album",
      artists: "1",
      genres: "1",
      album_type: "Sad",
      release_date: "05-08-2120"
    };
    component = setup(props);
  });

  it("Should render Create Album container in right way", () => {
    const wrapper = findByTestAttr(component, "createAlbum");
    expect(wrapper.length).toBe(1);
  });

  it("Should render close button in right way", () => {
    const wrapper = findByTestAttr(component, "createAlbumCloseBtn");
    expect(wrapper.length).toBe(1);
  });
  it("Should render cancel button in right way", () => {
    const wrapper = findByTestAttr(component, "createAlbumCancel");
    expect(wrapper.length).toBe(1);
  });
  it("Should render create button in right way", () => {
    const wrapper = findByTestAttr(component, "createAlbumCreate");
    expect(wrapper.length).toBe(1);
  });

  it("Should render add album form in right way", () => {
    const wrapper = findByTestAttr(component, "createAbumForm");
    expect(wrapper.length).toBe(1);
  });

  it("Should render album name field in right way", () => {
    const wrapper = findByTestAttr(component, "createAlbumName");
    expect(wrapper.length).toBe(1);
  });

  it("Should render album genres field in right way", () => {
    const wrapper = findByTestAttr(component, "createAlbumGenres");
    expect(wrapper.length).toBe(1);
  });

  it("Should render album type field in right way", () => {
    const wrapper = findByTestAttr(component, "createAlbumType");
    expect(wrapper.length).toBe(1);
  });

  it("Should render release date field in right way", () => {
    const wrapper = findByTestAttr(component, "createAlbumReleaseDate");
    expect(wrapper.length).toBe(1);
  });
});
