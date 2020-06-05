import React from 'react';
import {shallow, mount} from 'enzyme';
import * as renderer from 'react-test-renderer';
import SuggestedNavBar from './SuggestedNavBar';
import SuggestedArtist from './../../pages/SuggestedArtistPage/SuggestedArtist';
import ArtistCard from './Artistscards';

const setup = () => {
  return shallow(<SuggestedNavBar />);
};
describe('Test the the Suggested artist page ', () => {
  describe('test the render of the navbar ', () => {
    it('test the Logo render ', () => {
      const component = shallow(<SuggestedNavBar />);
      const logo = component.find(`[data-testid="oudlogoNvaBarSugg"]`);
      expect(logo.length).toBe(1);
    });
    it('render the text of the navbar ', () => {
      const component = shallow(<SuggestedNavBar />);
      const text = component.find(`[data-testid="TextNvaBarSugg"]`);
      expect(text.length).toBe(2);
    });
  });
  describe('text the render of the footer of the navbar on the suggested artist', () => {
    let component;
    beforeEach(() => {
      component = setup();
    });
    // it('test the render of the conditional rendering of the footer ', () => {
    //   const buttoncomp = shallow(<SuggestedFooterB />);
    //   const textcomp = shallow(<SuggestedFooterT />);
    //   expect(buttoncomp.state().choo).toBeTruthy();
    //   expect(textcomp.state().choo).toBeFalsy();
    // });
  });
  describe('Test the Artist card ', () => {
    it('test the image click', () => {
      const wrapper = shallow(<ArtistCard />);
      const image = wrapper.find(`[data-testid="artistImage"]`);
      image.simulate('click');
      expect(wrapper.state().isSelected).toBeFalsy();
    });
  });

  describe('test the  a snapshot', () => {
    it('test the snapshot ', () => {
      const wrapper = shallow(<SuggestedArtist />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
