import React from 'react';
import { render } from '@testing-library/react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import Body from './Body';

const setUP = (props = {}) => {
  const component = render(<Body />);
  return component;
};

describe('Body page testing ', () => {
  let component;
  beforeEach(() => {
    component = setUP();
  });

  it('render correctly component', () => {
    const TextInputComponent = renderer.create(<Body />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
  });

  it('render a background ', () => {
    const component = shallow(<Body />);
    const logo = component.find(`[data-testid="background"]`);
    expect(logo.length).toBe(1);
  });

  it('render a firstText ', () => {
    const component = shallow(<Body />);
    const Text = component.find(`[data-testid="firstText"]`);
    expect(Text.length).toBe(1);
  });
  it('render a secText ', () => {
    const component = shallow(<Body />);
    const Text = component.find(`[data-testid="secText"]`);
    expect(Text.length).toBe(1);
  });

  it('render a  Button ', () => {
    const component = shallow(<Body />);
    const Button = component.find(`[data-testid="getOudBtn"]`);
    expect(Button.length).toBe(1);
  });
});
