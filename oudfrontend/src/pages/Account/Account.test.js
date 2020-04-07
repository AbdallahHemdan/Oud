import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../components/Account/General/Utils";
import Account from "./Account";

const setUp = (props = {}) => {
  const component = shallow(<Account {...props} />);
  return component;
};

describe("Account", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Account should render without errors", () => {
    const wrapper = findByTestAtrr(component, "Account");
    expect(wrapper.length).toBe(1);
  });

  it("Navbar should render without errors", () => {
    const wrapper = findByTestAtrr(component, "NavBar");
    expect(wrapper.length).toBe(1);
  });
  it("HiddenSideBar should render without errors", () => {
    const wrapper = findByTestAtrr(component, "HiddenSideBar");
    expect(wrapper.length).toBe(1);
  });
  it("MainContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "MainContainer");
    expect(wrapper.length).toBe(1);
  });

  it("Footer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "Footer");
    expect(wrapper.length).toBe(1);
  });
});
