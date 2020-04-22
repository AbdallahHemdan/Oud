import React from "react";
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Navbar from "./Navbar"
import { findByTestAttr } from "./../../utils/index";


const setup = (props = {}) => {
    const component = shallow(
        <Navbar.WrappedComponent {...props} />
    )
    return component;
}


describe('Navbar Component', () => {
    describe('User has been logged in', () => {
        let component;
        beforeEach(() => {
            const props = {
                isLoggedIn: true
            }
            component = setup(props);
        })

        it('Should render navbar wrapper in right way', () => {
            const wrapper = findByTestAttr(component, "home-nav");
            expect(wrapper.length).toBe(1);
        });

        it('Should render left part of navbar in right way', () => {
            const wrapper = findByTestAttr(component, "left-part");
            expect(wrapper.length).toBe(1);
        });

        it('Should render back and forward wrapper in right way', () => {
            const wrapper = findByTestAttr(component, "nav-back-forward");
            expect(wrapper.length).toBe(1);
        });

        it('Should render back icon in right way', () => {
            const wrapper = findByTestAttr(component, "back-switch");
            expect(wrapper.length).toBe(1);
        });

        it('Should render forward icon in right way', () => {
            const wrapper = findByTestAttr(component, "forward-switch");
            expect(wrapper.length).toBe(1);
        });

        it('Should render search input in right way', () => {
            const wrapper = findByTestAttr(component, "search-input");
            expect(wrapper.length).toBe(1);
        });

        it('Should render toggle button in right way', () => {
            const wrapper = findByTestAttr(component, "toggle-btn");
            expect(wrapper.length).toBe(1);
        });

        it('Should render right part of navbar in right way', () => {
            const wrapper = findByTestAttr(component, "right-part");
            expect(wrapper.length).toBe(1);
        });

        it('Should render right part of navbar after login in right way', () => {
            const wrapper = findByTestAttr(component, "right-after-login");
            expect(wrapper.length).toBe(1);
        });


    });

    describe('User has not been logged in', () => {
        let component;
        beforeEach(() => {
            const props = {
                isLoggedIn: false
            }
            component = setup(props);
        })

        it('Should render navbar wrapper in right way', () => {
            const wrapper = findByTestAttr(component, "home-nav");
            expect(wrapper.length).toBe(1);
        });

        it('Should render left part of navbar in right way', () => {
            const wrapper = findByTestAttr(component, "left-part");
            expect(wrapper.length).toBe(1);
        });

        it('Should render back and forward wrapper in right way', () => {
            const wrapper = findByTestAttr(component, "nav-back-forward");
            expect(wrapper.length).toBe(1);
        });

        it('Should render back icon in right way', () => {
            const wrapper = findByTestAttr(component, "back-switch");
            expect(wrapper.length).toBe(1);
        });

        it('Should render forward icon in right way', () => {
            const wrapper = findByTestAttr(component, "forward-switch");
            expect(wrapper.length).toBe(1);
        });

        it('Should render search input in right way', () => {
            const wrapper = findByTestAttr(component, "search-input");
            expect(wrapper.length).toBe(1);
        });

        it('Should render toggle button in right way', () => {
            const wrapper = findByTestAttr(component, "toggle-btn");
            expect(wrapper.length).toBe(1);
        });

        it('Should render right part of navbar in right way', () => {
            const wrapper = findByTestAttr(component, "right-part");
            expect(wrapper.length).toBe(1);
        });

        it('Should render right part of navbar before login in right way', () => {
            const wrapper = findByTestAttr(component, "right-before-login");
            expect(wrapper.length).toBe(1);
        });

    });


});