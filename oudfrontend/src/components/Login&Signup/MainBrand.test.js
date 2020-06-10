import React from 'react';
import {shallow, mount} from 'enzyme';
import {findByTestAttr} from './../../utils/index';
import MainBrand from './MainBrand';
import {MemoryRouter} from 'react-router-dom';
const setup = (props = {}) => {
  const component = shallow(<MainBrand {...props} />);
  return component;
};
describe('test the MainBrand', () => {
  let component;
  beforeEach(() => {
    const props = {};
    component = setup(props);
  });
  it('Render the OudImage text box ', () => {
    const wrapper = findByTestAttr(component, 'OudImage');
    expect(wrapper.length).toBe(1);
  });
  describe('Snapshot test', () => {
    it('renders component correctly', () => {
      const wrapper = shallow(<MainBrand />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
