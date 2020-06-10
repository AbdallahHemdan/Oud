import React from 'react'
import SongList from './songList';
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import checkPropTypes from 'check-prop-types'
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const fullProps = {
    recieved: true,
    tracks: [
        {
            "id": "19",
            "name": "إنسان",
            "artists": [
                {
                    "id": "5",
                    "name": "حمزة نمرة",
                    "type": "shaaby",
                    "image": "string"
                },
                {
                    "id": "2",
                    "name": "Sardeena",
                    "type": "Shaaby",
                    "image": "string"
                }
            ],
            "album":{
                "name":"ddd"
            },
            "albumId": "1",
            "type": "Jazz",
            "audioUrl": "www.Facebook.com"
        },
        {
            "id": "20",
            "name": "سلاح التلميذ",
            "artists": [
                {
                    "id": "3",
                    "name": "ًWegz el wench",
                    "type": "Trap",
                    "image": "string"
                },
                {
                    "id": "4",
                    "name": "Amr Diab",
                    "type": "farafeery",
                    "image": "string"
                }
            ],
            "album":{
                "name":"ddd"
            },
            "albumId": "1",
            "type": "Trap",
            "audioUrl": "www.facebook.com"
        }],
    pause: jest.fn(),
    resume: jest.fn(),
    addToQueue: jest.fn(),
    clickedItemId: '0',
    
    webPlayer:{current:{playContext:jest.fn()}}
}
const setup = (props = {}) => {
    return shallow(<SongList {...props} />);
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-testid="${val}"]`);
}
describe('SongList Component', () => {
    describe('testing SongList Component with recieved equal false', () => {
        let component;
        let props = { recieved: false }
        beforeEach(() => {
            component = setup(props);
        })
        it('renders songsList correctly when recived = false', () => {
            const wrapper = findByTestAttr(component, 'songsList');
            expect(wrapper.length).toBe(1);
        });
        it("doesn't render songElement when recived = false", () => {
            const wrapper = findByTestAttr(component, 'songElement');
            expect(wrapper.length).toBe(0);
        });
        it("doesn't render songElement when recived = false", () => {
            const wrapper = findByTestAttr(component, 'loading');
            expect(wrapper.length).toBe(1);
        });
    });

    describe('testing SongList Component without props', () => {
        let component;
        beforeEach(() => {
            component = setup();
        })
        it('renders songsList correctly when without props', () => {
            const wrapper = findByTestAttr(component, 'songsList');
            expect(wrapper.length).toBe(1);
        });
        it("doesn't render songElement when without props", () => {
            const wrapper = findByTestAttr(component, 'songElement');
            expect(wrapper.length).toBe(0);
        });
        it("doesn't render songElement when without props", () => {
            const wrapper = findByTestAttr(component, 'loading');
            expect(wrapper.length).toBe(1);
        });
    });

    describe('testing SongList Component with recieved equal true and tracks is empty', () => {
        let component;
        let props = { recieved: true, tracks: [] }
        beforeEach(() => {
            component = setup(props);
        })
        it('render songsList correctly when recived = true and tracks is empty', () => {
            const wrapper = findByTestAttr(component, 'songsList');
            expect(wrapper.length).toBe(1);
        });
        it("doesn't render songElement when recived = true and tracks is empty", () => {
            const wrapper = findByTestAttr(component, 'songElement');
            expect(wrapper.length).toBe(0);
        });
        it("doesn't render songElement when without props", () => {
            const wrapper = findByTestAttr(component, 'loading');
            expect(wrapper.length).toBe(0);
        });
    });

    describe('testing SongList Component with recieved equal true and tracks not empty', () => {
        let component;
        beforeEach(() => {
            component = setup(fullProps);
        })
        it('render songsList correctly when recived = true and tracks not empty', () => {
            const wrapper = findByTestAttr(component, 'songsList');
            expect(wrapper.length).toBe(1);
        });
        it("doesn't render songElement when recived = true and tracks is not empty", () => {
            const wrapper = findByTestAttr(component, 'songElement');
            expect(wrapper.length).toBe(2);
        });
        it("doesn't render songElement when without props", () => {
            const wrapper = findByTestAttr(component, 'loading');
            expect(wrapper.length).toBe(0);
        });
    });
    describe('checking propTypes', ()=>{
        const props10 ={recieved:true, tracks:{}}
        const props11 ={recieved:true, tracks:[]}
        const props01 ={recieved:4, tracks:[]}
        const props00 ={recieved:4, tracks:{}}
        //testing with full props
        it('should not throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { ...fullProps }, 'prop', SongList.name);
            expect(result).toBeUndefined();
        })

        //testing pause function by sending invalid data
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { pause: '1' }, 'prop', SongList.name);
            expect(result).toBeDefined();
        })
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { pause: 1 }, 'prop', SongList.name);
            expect(result).toBeDefined();
        })
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { pause: true }, 'prop', SongList.name);
            expect(result).toBeDefined();
        })

        //testing resume function by sending invalid data
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { resume: '1' }, 'prop', SongList.name);
            expect(result).toBeDefined();
        })
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { resume: 1 }, 'prop', SongList.name);
            expect(result).toBeDefined();
        })
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { resume: true }, 'prop', SongList.name);
            expect(result).toBeDefined();
        })

        //testing addToQueue function by sending invalid data
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { addToQueue: '1' }, 'prop', SongList.name);
            expect(result).toBeDefined();
        })
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { addToQueue: 1 }, 'prop', SongList.name);
            expect(result).toBeDefined();
        })
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { addToQueue: true }, 'prop', SongList.name);
            expect(result).toBeDefined();
        })

        //testing clicked Item Id by sending false data
        it('should not throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, { clickedItemId: 1 }, 'prop', SongList.name);
            expect(result).toBeDefined();
        });


        it('should not throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, props11, 'prop', SongList.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, props10, 'prop', SongList.name);
            expect(result).toBeDefined();
        });
        it('should not throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, props01, 'prop', SongList.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', () => {
            const result = checkPropTypes(SongList.propTypes, props00, 'prop', SongList.name);
            expect(result).toBeDefined();
        });
    });
    describe('calling functions', ()=>{
        let component;
        beforeEach(()=>{
            component = setup(fullProps)
        });
        it('calling handleClick ', ()=>{
            component.setState({clickedItemId:'0'})
            component.instance().handleClick('2');
            expect(component.state().clickedItemId).toBe('2');
        });
        it('change the recieved props', () => {
            component.setState({clickedItemId:'0'})
            component.setProps({clickedItemId:'2'})
            expect(component.state().clickedItemId).toBe('2');
        })
        it('change the recieved props', () => {
            component.setState({clickedItemId:'0'})
            component.setProps({clickedItemId:'0'})
            expect(component.state().clickedItemId).toBe('0');
        })
        it('calling handlePlay ', ()=>{
            const comp = setup({...fullProps, contextType:'album'})
            comp.setState({playing:true})
            comp.instance().handlePlay('19');
            expect(comp.state().playing).toBe(false);
        });
        it('calling handlePlay ', ()=>{
            component.setState({playing:true})
            component.instance().handlePlay('19');
            expect(component.state().playing).toBe(false);
        });
        it('calling handlePlay ', ()=>{
            const comp = setup({...fullProps, contextType:'playlist'})
            comp.setState({playing:false})
            comp.instance().handlePlay('19');
            expect(comp.state().playing).toBe(true);
        });
    });
    describe('snapshot test', () => {
        it('renders correctly', () => {
            const tree = renderer
                .create(<SongList {...fullProps} />)
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
