import React from 'react';
import { shallow } from 'enzyme';
import MusicItem from './MusicItem';
import { findByTestAttr } from "../../../utils/index"


const setup = (props = {}) => {
    const component = shallow(<MusicItem {...props} />)
    return component;
}


describe('Music Item component', () => {
    let component;
    beforeEach(() => {
        const props = {
            "item": {
                "id": 1,
                "name": "Recently played",
                "icon": "http://lorempixel.com/640/480/cats"
            }
        }
        component = setup(props);
    })
    it('Should render category Header in right way', () => {
        const wrapper = findByTestAttr(component, "category-header");
        expect(wrapper.length).toBe(1);
    });

    it('Should render category title in right way', () => {
        const wrapper = findByTestAttr(component, "category-title");
        expect(wrapper.length).toBe(1);
    });

    it('Should render category see all in right way', () => {
        const wrapper = findByTestAttr(component, "category-see-all");
        expect(wrapper.length).toBe(1);
    });

    it('Should render first wrapper in right way', () => {
        const wrapper = findByTestAttr(component, "first-wrapper");
        expect(wrapper.length).toBe(1);
    });

    it('Should render second wrapper in right way', () => {
        const wrapper = findByTestAttr(component, "second-wrapper");
        expect(wrapper.length).toBe(1);
    });

    it('Should render music cards wrapper in right way', () => {
        const wrapper = findByTestAttr(component, "cards-wrapper");
        expect(wrapper.length).toBe(1);
    });


});
