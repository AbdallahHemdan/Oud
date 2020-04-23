import React from "react";
import { shallow } from 'enzyme';
import { findByTestAttr } from "./../../../utils/index"
import { BeforeLogin } from "./BeforeLogin";


const setup = (props = {}) => {
    const component = shallow(
        <BeforeLogin {...props} />
    )
    return component;
}


describe('Before login  Component', () => {
    let component;
    beforeEach(() => {
        component = setup();
    })

    it('Should render before login wrapper in right way', () => {
        const wrapper = findByTestAttr(component, "before-login");
        expect(wrapper.length).toBe(1);
    });

    it('Should render login btn in right way', () => {
        const wrapper = findByTestAttr(component, "login-btn");
        expect(wrapper.length).toBe(1);
    });

    it('Should render signup btn in right way', () => {
        const wrapper = findByTestAttr(component, "signup-btn");
        expect(wrapper.length).toBe(1);
    });

    it('Should render login link in right way', () => {
        const wrapper = findByTestAttr(component, "login-link");
        expect(wrapper.length).toBe(1);
    });

    it('Should render signup link in right way', () => {
        const wrapper = findByTestAttr(component, "signup-link");
        expect(wrapper.length).toBe(1);
    });

});