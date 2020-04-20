import React from "react";
import { shallow } from 'enzyme';
import { findByTestAttr } from "./../../../utils/index"
import { AfterLogin } from "./AfterLogin";


const setup = (props = {}) => {
    const component = shallow(
        <AfterLogin {...props} />
    )
    return component;
}


describe('AfterLogin login  Component', () => {
    let component;
    beforeEach(() => {
        component = setup();
    })

    it('Should render after login wrapper in right way', () => {
        const wrapper = findByTestAttr(component, "after-login");
        expect(wrapper.length).toBe(1);
    });

    it('Should render upgrade button in right way', () => {
        const wrapper = findByTestAttr(component, "upgrade-btn");
        expect(wrapper.length).toBe(1);
    });

    it('Should render upgrade link in right way', () => {
        const wrapper = findByTestAttr(component, "upgrade-link");
        expect(wrapper.length).toBe(1);
    });
    it('Should render dropdown wrapper in right way', () => {
        const wrapper = findByTestAttr(component, "dropdown-wrapper");
        expect(wrapper.length).toBe(1);
    });

    it('Should render profile dropdown link in right way', () => {
        const wrapper = findByTestAttr(component, "profile-dropdown-link");
        expect(wrapper.length).toBe(1);
    });

    it('Should render profile image in right way', () => {
        const wrapper = findByTestAttr(component, "profile-img");
        expect(wrapper.length).toBe(1);
    });

    it('Should render profile dropdown in right way', () => {
        const wrapper = findByTestAttr(component, "profile-dropdown");
        expect(wrapper.length).toBe(1);
    });

    it('Should render account dropdown element in right way', () => {
        const wrapper = findByTestAttr(component, "account-dropdown-element");
        expect(wrapper.length).toBe(1);
    });

    it('Should render logout dropdown element in right way', () => {
        const wrapper = findByTestAttr(component, "logout-dropdown-element");
        expect(wrapper.length).toBe(1);
    });

    it('Should render user name text in right way', () => {
        const wrapper = findByTestAttr(component, "username");
        expect(wrapper.length).toBe(1);
    });



});