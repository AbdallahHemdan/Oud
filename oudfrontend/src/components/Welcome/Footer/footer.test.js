import React from 'react';
import { render } from '@testing-library/react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';
const setUP = (props = {}) => {
  const component = shallow(<Footer />);
  return component;
};

describe('Body page testing ', () => {
  let component;
  beforeEach(() => {
    component = setUP();
  });
  it('render correctly text component', () => {
    const TextInputComponent = shallow(<Footer />);
    expect(TextInputComponent).toMatchSnapshot();
  });

  it('render a logoImage ', () => {
    const component = shallow(<Footer />);
    const logo = component.find(`[data-testid="logoImage"]`);
    expect(logo.length).toBe(1);
  });
  it('render a Text Company', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="Company"]`);
    expect(Text.length).toBe(1);
  });

  it('render a Text About', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="About"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text Features', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="Features"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text Help', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="Help"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text Others', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="Others"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text Artists', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="Artists"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text Developers', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="Developers"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text Investors', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="Investors"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text Links', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="Links"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text WePlayer', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="WePlayer"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text MobileApp', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="MobileApp"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text faFacebook', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="faFacebook"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text faTwitter', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="faTwitter"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text faInstagram', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="faInstagram"]`);
    expect(Text.length).toBe(1);
  });
  it('render a Text faYoutube', () => {
    const component = shallow(<Footer />);
    const Text = component.find(`[data-testid="faYoutube"]`);
    expect(Text.length).toBe(1);
  });
});
