import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import Signup from '../components/signup/signup';
import MainBrand from '../components/signup/MainBrand';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with or without a name', () => {
  act(() => {
    render(<MainBrand />, container);
  });
  expect(container.).toBe('Hey, stranger');

});

describe(Signup, () => {
  //   it('render a text form ', () => {
  //     const name_form = document.createElement('div');
  //     ReactDOM.render(<input></input>, name_form);
  //   });
  //   it('Should capture firstname correctly onChange', function() {
  //     const name = document.getElementById('name');
  //     const input = name.document.getElementById('name');
  //     input.instance().value = 'name';
  //     input.simulate('change');
  //     expect(Signup.name).toEqual('abdallah');
  //   });
  //   it('Should capture email correctly onChange and change the props accordingly', function() {
  //     const component = mount(<Signup />);
  //     const input = component.find('input').at(2);
  //     input.instance().value = 'mail@hotmail.com';
  //     input.simulate('change');
  //     expect(
  //       component
  //         .find('input')
  //         .at(2)
  //         .props().value
  //     ).toEqual('mail@hotmail.com');
  //   });
});
