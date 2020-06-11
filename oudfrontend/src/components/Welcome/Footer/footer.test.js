import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr} from './../../../utils/index';
import Footer from './Footer';
const setup = (props = {}) => {
  const component = shallow(<Footer {...props} />);
  return component;
};

describe('Body page testing ', () => {
  let component;
  beforeEach(() => {
    const props = {};
    component = setup(props);
  });
  it('render correctly text component', () => {
    const TextInputComponent = shallow(<Footer />);
    expect(TextInputComponent).toMatchSnapshot();
  });

  it('render a logoImage ', () => {
    const wrapper = findByTestAttr(component, 'logoImage');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text Company', () => {
    const wrapper = findByTestAttr(component, 'Company');
    expect(wrapper.length).toBe(1);
  });

  it('render a Text About', () => {
    const wrapper = findByTestAttr(component, 'About');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text Features', () => {
    const wrapper = findByTestAttr(component, 'Features');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text Help', () => {
    const wrapper = findByTestAttr(component, 'Help');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text Others', () => {
    const wrapper = findByTestAttr(component, 'Others');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text Artists', () => {
    const wrapper = findByTestAttr(component, 'Artists');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text Links', () => {
    const wrapper = findByTestAttr(component, 'Links');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text WePlayer', () => {
    const wrapper = findByTestAttr(component, 'WePlayer');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text MobileApp', () => {
    const wrapper = findByTestAttr(component, 'MobileApp');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text faFacebook', () => {
    const wrapper = findByTestAttr(component, 'faFacebook');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text faTwitter', () => {
    const wrapper = findByTestAttr(component, 'faTwitter');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text faInstagram', () => {
    const wrapper = findByTestAttr(component, 'faInstagram');
    expect(wrapper.length).toBe(1);
  });
  it('render a Text faYoutube', () => {
    const wrapper = findByTestAttr(component, 'faYoutube');
    expect(wrapper.length).toBe(1);
  });
});
