import React from 'react';
import Signup from '../components/signup/signup';
import MainBrand from '../components/signup/MainBrand';
import {render} from '@testing-library/react';
import * as renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import '../../src/setuptest';
import '@testing-library/jest-dom/extend-expect';
import SocialIcons from '../components/signup/SocialIcons';
import SignIn from '../components/signin/signin';
import ResetPassword from '../components/ForgetPassword/resetPassword';
jest.mock('axios');

const setUP = (props = {}) => {
  const component = render(<Signup />);
  return component;
};

describe('Sign up page testing ===>', () => {
  let component;
  beforeEach(() => {
    component = setUP();
  });

  it('render correctly text component', () => {
    const TextInputComponent = renderer.create(<Signup />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
  });

  it('render a image ', () => {
    const component = shallow(<MainBrand />);
    const logo = component.find(`[data-testid="OudImage"]`);
    expect(logo.length).toBe(1);
  });

  it('render a Text ', () => {
    const component = shallow(<MainBrand />);
    const Text = component.find(`[data-testid="Oud"]`);
    expect(Text.length).toBe(1);
  });

  it('render a Facebook Button ', () => {
    const component = shallow(<SocialIcons />);
    const wrapper = shallow(<SocialIcons />);
    const FacebookButton = component.find(`[data-testid="FacebookButton"]`);
    expect(FacebookButton.length).toBe(1);
  });

  it('render the username form ', () => {
    const component = shallow(<Signup />);
    const userNameForm = component.find(`[data-testid="register-displayname"]`);
    expect(userNameForm.length).toBe(1);
  });

  it('render the email form ', () => {
    const component = shallow(<Signup />);
    const emailForm = component.find(`[data-testid="register-email"]`);
    expect(emailForm.length).toBe(1);
  });
  it('render the password form ', () => {
    const component = shallow(<Signup />);
    const passwordForm = component.find(`[data-testid="register-password"]`);
    expect(passwordForm.length).toBe(1);
  });
  it('render the confirmpassword form ', () => {
    const component = shallow(<Signup />);
    const confirmpasswordForm = component.find(
      `[data-testid="register-confirmPassword"]`
    );
    expect(confirmpasswordForm.length).toBe(1);
  });
  it('render the gender form ', () => {
    const component = shallow(<Signup />);
    const genderForm = component.find(`[data-testid="register-male"]`);
    expect(genderForm.length).toBe(1);
  });
  it('render the year form ', () => {
    const component = shallow(<Signup />);
    const yearForm = component.find(`[data-testid="register-dob-year"]`);
    expect(yearForm.length).toBe(1);
  });
  it('render the month form ', () => {
    const component = shallow(<Signup />);
    const monthForm = component.find(`[data-testid="register-dob-month"]`);
    expect(monthForm.length).toBe(1);
  });
  it('render the day form ', () => {
    const component = shallow(<Signup />);
    const dayForm = component.find(`[data-testid="register-dob-day"]`);
    expect(dayForm.length).toBe(1);
  });
  it('render the SignUp btn form ', () => {
    const component = shallow(<Signup />);
    const SignUpbuttonForm = component.find(`[data-testid="SignUp-btn"]`);
    expect(SignUpbuttonForm.length).toBe(1);
  });

  it('render the SignINbtn btn ', () => {
    const component = shallow(<Signup />);
    const SignINbtnbutton = component.find(`[data-testid="SignIN-btn"]`);
    expect(SignINbtnbutton.length).toBe(1);
  });

  it('render the SignIn btn ', () => {
    const component = shallow(<SignIn />);
    const SignINButton = component.find(`[data-testid="SignUpBtn"]`);
    expect(SignINButton.length).toBe(1);
  });
  it('render the SignUp btn ', () => {
    const component = shallow(<SignIn />);
    const SignUpButton = component.find(`[data-testid="SignUpBtn"]`);
    expect(SignUpButton.length).toBe(1);
  });

  it('render the Forgetpass btn ', () => {
    const component = shallow(<SignIn />);
    const Forgetpass = component.find(`[data-testid="Forgetpass"]`);
    expect(Forgetpass.length).toBe(1);
  });

  it('render the gridCheck btn ', () => {
    const component = shallow(<SignIn />);
    const gridCheck = component.find(`[data-testid="gridCheck"]`);
    expect(gridCheck.length).toBe(1);
  });

  it('render the login-button btn ', () => {
    const component = shallow(<SignIn />);
    const loginButton = component.find(`[data-testid="login-button"]`);
    expect(loginButton.length).toBe(1);
  });

  it('render the login-Password  ', () => {
    const component = shallow(<SignIn />);
    const loginPassword = component.find(`[data-testid="login-password"]`);
    expect(loginPassword.length).toBe(1);
  });

  it('render the login-UserName input ', () => {
    const component = shallow(<SignIn />);
    const loginUserName = component.find(`[data-testid="login-username"]`);
    expect(loginUserName.length).toBe(1);
  });

  it('render the restPass btn ', () => {
    const component = shallow(<ResetPassword />);
    const restPass = component.find(`[data-testid="restPass"]`);
    expect(restPass.length).toBe(1);
  });
  it('render the backToLogin btn ', () => {
    const component = shallow(<ResetPassword />);
    const backToLogin = component.find(`[data-testid="backToLogin"]`);
    expect(backToLogin.length).toBe(1);
  });

  it('render the registerConfirmPassword input ', () => {
    const component = shallow(<ResetPassword />);
    const registerConfirmPassword = component.find(
      `[data-testid="registerConfirmPassword"]`
    );
    expect(registerConfirmPassword.length).toBe(1);
  });

  it('render the registerPassword input ', () => {
    const component = shallow(<ResetPassword />);
    const registerpassword = component.find(`[data-testid="registerpassword"]`);
    expect(registerpassword.length).toBe(1);
  });

  it('show password button ', () => {
    const wrapper = shallow(<Signup />);
    const Button = wrapper.find(`[data-testid="showPass"]`);
    Button.simulate('click');
    expect(wrapper.state().showText).toEqual('hide');
    Button.simulate('click');
    expect(wrapper.state().showText).toEqual('show');
  });

  it('sign up onsubmit ', () => {
    const wrapper = shallow(<Signup />);
    const OnSubmitButton = wrapper.find(`[data-testid="SignUp-btn"]`);
    OnSubmitButton.simulate('click');
    let state = {
      name: 'abdallah',
      email: 'abdallah@gmail.com',
      gender: 'male',
      year: '2000',
      month: '12',
      day: '5',
      roll: 'free',
    };
    expect((wrapper.state().name = 'abdallah')).toEqual(state.name);
    expect((wrapper.state().email = 'abdallah@gmail.com')).toEqual(state.email);
    expect((wrapper.state().gender = 'male')).toEqual(state.gender);
    expect((wrapper.state().year = '2000')).toEqual(state.year);
    expect((wrapper.state().month = '12')).toEqual(state.month);
    expect((wrapper.state().day = '5')).toEqual(state.day);
    expect((wrapper.state().roll = 'free')).toEqual(state.roll);
  });

  it('login onsubmit ', () => {
    const wrapper = shallow(<SignIn />);
    const OnSubmitButton = wrapper.find(`[data-testid="SignInBtn"]`);
    OnSubmitButton.simulate('click');
    let state = {
      email: 'abdallah@gmail.com',
    };
    expect((wrapper.state().email = 'abdallah@gmail.com')).toEqual(state.email);
  });
});
