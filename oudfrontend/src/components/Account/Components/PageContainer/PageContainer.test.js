import React from "react";
import { shallow } from "enzyme";
import { findByTestAtrr } from "./../../General/Utils";
import PageContainer from "./PageContainer";

const setUp = (props = {}) => {
  const component = shallow(<PageContainer {...props} />);
  return component;
};

describe("PageContainer", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("pageContainer should render without errors", () => {
    const wrapper = findByTestAtrr(component, "pageContainer");
    expect(wrapper.length).toBe(1);
  });
  it("content should render without errors", () => {
    const wrapper = findByTestAtrr(component, "content");
    expect(wrapper.length).toBe(1);
  });

  it("accountOverview should render without errors", () => {
    const wrapper = findByTestAtrr(component, "accountOverview");
    expect(wrapper.length).toBe(1);
  });
  it("EditPassword should render without errors", () => {
    const wrapper = findByTestAtrr(component, "EditPassword");
    expect(wrapper.length).toBe(1);
  });
  it("changePassword should render without errors", () => {
    const wrapper = findByTestAtrr(component, "changePassword");
    expect(wrapper.length).toBe(1);
  });

  it("account should render without errors", () => {
    const wrapper = findByTestAtrr(component, "account");
    expect(wrapper.length).toBe(1);
  });
});
