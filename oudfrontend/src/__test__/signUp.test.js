import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Signup from '../components/signup/signup';
import MainBrand from '../components/signup/MainBrand';

Enzyme.configure({adapter: new Adapter()});

const setUP = (props = {}) => {
  const component = shallow(<MainBrand />);
  return component;
};

describe('<MainBrand>', () => {
  let component;
  beforeEach(() => {
    component = setUP();
  });

  test('logo must be rendered', () => {
    const logo = component.find(`[data-testid="OudText"]`);
    expect(logo.text()).toBe('Oud');
  });
});
