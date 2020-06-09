import React from 'react';
import {shallow, mount} from 'enzyme';
import * as renderer from 'react-test-renderer';
import ResetPassword from './resetPassword.js';

describe('test for restpassword ', () => {
  describe('test the render ', () => {
    it('test the render of the buttons', () => {
      console.log('as', <ResetPassword.WrappedComponent />);
      const component = shallow(<ResetPassword.WrappedComponent />);
      const button = component.find(`[data-testid="testIdOfButton"]`);
      expect(button.length).toBe(2);
      const Text = component.find(`[data-testid="restPasswordText"]`);
      expect(Text.length).toBe(4);
      const input = component.find(`[data-testid="registerPassword"]`);
      expect(input.length).toBe(2);
    });
  });
});
