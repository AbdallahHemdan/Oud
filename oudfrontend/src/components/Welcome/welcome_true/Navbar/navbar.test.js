import React from 'react';
import { render } from '@testing-library/react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';
const setUP = (props = {}) => {
  const component = shallow(<Navbar />);
  return component;
};

describe('Body page testing ', () => {
  // eslint-disable-next-line no-unused-vars
  let component;
  beforeEach(() => {
    component = setUP();
  });
  it('render correctly component', () => {
    const TextInputComponent = shallow(<Navbar />);
    expect(TextInputComponent).toMatchSnapshot();
  });
  it('render a oud logo ', () => {
    const component = shallow(<Navbar />);
    const logo = component.find(`[data-testid="oudlogo"]`);
    expect(logo.length).toBe(1);
  });
  it('render a  Button ', () => {
    const component = shallow(<Navbar />);
    const Button = component.find(`[data-testid="button"]`);
    expect(Button.length).toBe(1);
  });
  it('render a Premium ', () => {
    const component = shallow(<Navbar />);
    const logo = component.find(`[data-testid="Premium"]`);
    expect(logo.length).toBe(1);
  });
  it('render a Help ', () => {
    const component = shallow(<Navbar />);
    const logo = component.find(`[data-testid="Help"]`);
    expect(logo.length).toBe(1);
  });
  it('render a Download ', () => {
    const component = shallow(<Navbar />);
    const logo = component.find(`[data-testid="Download"]`);
    expect(logo.length).toBe(1);
  });
  it('render a profImage ', () => {
    const component = shallow(<Navbar />);
    const logo = component.find(`[data-testid="profImage"]`);
    expect(logo.length).toBe(1);
  });
  it('render a Account ', () => {
    const component = shallow(<Navbar />);
    const logo = component.find(`[data-testid="Account"]`);
    expect(logo.length).toBe(1);
  });
  it('render a LogOut ', () => {
    const component = shallow(<Navbar />);
    const logo = component.find(`[data-testid="LogOut"]`);
    expect(logo.length).toBe(1);
  });
});
