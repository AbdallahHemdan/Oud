import React from "react";
import { shallow } from 'enzyme';
import { findByTestAttr } from "./../../utils/index"
import LoadingSnipper from "./LoadingSnipper"
import renderer from 'react-test-renderer';


const setup = (props = {}) => {
  const component = shallow(
    <LoadingSnipper {...props} />
  )
  return component;
};

describe('Loading Snipper Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  })
  it('Should render Loading Snipper Wrapper', () => {
    const wrapper = findByTestAttr(component, "snipper");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "snipper-1");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "snipper-2");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "snipper-3");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "snipper-4");
    expect(wrapper.length).toBe(1);
  });
  it('Should render Loading Snipper first Column', () => {
    const wrapper = findByTestAttr(component, "snipper-5");
    expect(wrapper.length).toBe(1);
  });

  describe('snapshot test', () => {
    it('renders correctly', () => {
      const tree = renderer
        .create(<LoadingSnipper />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});