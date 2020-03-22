import React from 'react';
import Signup from '../components/signup/signup';
import {render, cleanup} from 'react-testing-library';
import Header from './Header';

afterEach(cleanup);

it('renders', () => {
  const {asFragment} = render(<Signup />);
  expect(asFragment()).toMatchSnapshot();
});
