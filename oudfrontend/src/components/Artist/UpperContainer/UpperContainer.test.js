import React from "react";
import { shallow, mount } from "enzyme";
import UpperContainer from "./UpperContainer";
import Options from "./Options";
const setup = () => {
  const component = shallow(
    <UpperContainer
      artistId={"1"}
      username={"aashrafh"}
      cover={""}
      followStatus={true}
      handleFollowClick={() => {}}
    />
  );
  return component;
};

describe("artist from user view component: testing upper part", () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  it("redndering the whole upper components", () => {
    expect(component.find(".artist-user").exists()).toBe(true);
  });
  it("redndering the play button", () => {
    expect(component.find(".play-artist").exists()).toBe(true);
  });
  it("redndering the follow button", () => {
    expect(
      component.find("#artist-follow-button-upperContainer").exists()
    ).toBe(true);
  });
  it("redndering the option dropdown", () => {
    expect(component.find(".artist-options-dropdown").exists()).toBe(true);
  });
  it("redndering the option dropdown", () => {
    const wrapper = mount(
      <Options
        artistId={"1"}
        followStatus={true}
        handleFollowClick={() => {}}
      />
    );
    expect(wrapper.find(".artist-ellipsis-container").exists()).toBe(true);
  });
});
