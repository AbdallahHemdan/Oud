import React from 'react';
import {shallow, mount} from 'enzyme';
import * as renderer from 'react-test-renderer';
import ForgotPassword from './ForgotPassword';
/**it('', () => {}); */
describe('test the ForgetPassword', () => {
  describe('test for ForgetPassword', () => {
    describe('test the render', () => {
      it('test the render of text ', () => {
        const component = shallow(<ForgotPassword />);
        const Text = component.find(`[data-testid="forgetPasswordText"]`);
        expect(Text.length).toBe(3);
      });
      it('test the render input ', () => {
        const component = shallow(<ForgotPassword />);
        const Text = component.find(`[data-testid="forgetPassword-email"]`);
        expect(Text.length).toBe(1);
      });
    });
  });
 
});
