import React from "react";
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import Sidebar from "./Sidebar";
import { findByTestAttr } from "./../../utils/index";


const setup = (props = {}) => {
    const component = shallow(
        <Sidebar {...props} />
    )
    return component;
}


describe('Sidebar Component', () => {
    let component;
    beforeEach(() => {
        component = setup();
    })

    it('Should render oud logo wrapper in right way', () => {
        const wrapper = findByTestAttr(component, "oud-logo-component");
        expect(wrapper.length).toBe(1);
    });

    it('Should render oud logo image in right way', () => {
        const wrapper = findByTestAttr(component, "oud-logo-img");
        expect(wrapper.length).toBe(1);
    });

    it('Should render oud logo link in right way', () => {
        const wrapper = findByTestAttr(component, "oud-logo-link");
        expect(wrapper.length).toBe(1);
    });

    it('Should render first sidebar elements in right way', () => {
        const wrapper = findByTestAttr(component, "first-sidebar-elements");
        expect(wrapper.length).toBe(1);
    });

    it('Should render 3 sidebar elements in the first part in right way', () => {
        const wrapper = findByTestAttr(component, "first-sidebar-element");
        expect(wrapper.length).toBe(3);
    });

    it('Should render playlist text in right way', () => {
        const wrapper = findByTestAttr(component, "playlist-text");
        expect(wrapper.length).toBe(1);
    });

    it('Should render second sidebar elements in right way', () => {
        const wrapper = findByTestAttr(component, "second-sidebar-elements");
        expect(wrapper.length).toBe(1);
    });

    it('Should render 2 sidebar elements in the second part in right way', () => {
        const wrapper = findByTestAttr(component, "second-sidebar-element");
        expect(wrapper.length).toBe(2);
    });

    it('Should render content divider in right way', () => {
        const wrapper = findByTestAttr(component, "divider");
        expect(wrapper.length).toBe(1);
    });


});