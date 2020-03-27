import React from 'React'
import renderer from 'react-test-renderer';
import Playlist from './playlist.jsx';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import checkPropTypes from 'check-prop-types'

Enzyme.configure({adapter: new EnzymeAdapter()});


const setup = (props={}) =>{
    return shallow(<Playlist id = {props}/>);
}

const findByTestAttr=(wrapper, val)=>{
    return wrapper.find(`[data-testid="${val}"]`);
}

const trueProps={id:"1"}



/*
Rendering tests
*/

describe('Playlist Component', ()=>{
    describe('testing playlist renders Correctly', ()=>{
        let component;
        beforeEach (()=>{
            component = setup(trueProps);
        })
        it('renders playlist component', ()=>{
            const wrapper = findByTestAttr(component, "playlist");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlist component', ()=>{
            const wrapper = findByTestAttr(component, "playlistHeader");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlist component', ()=>{
            const wrapper = findByTestAttr(component, "playlistIamge");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlist component', ()=>{
            const wrapper = findByTestAttr(component, "playlistIamgeContainer");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlist component', ()=>{
            const wrapper = findByTestAttr(component, "playlistHeaderBody");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlist component', ()=>{
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlist component', ()=>{
            const wrapper = findByTestAttr(component, "HeaderBodyTop");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlist component', ()=>{
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(1);
        });
    
    
    });
    
    describe('snapshot test for the playlist', ()=>{
        it('renders correctly', () => {
            const tree = renderer
              .create(<Playlist id={trueProps}/>)
              .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    describe('checking propTypes', ()=>{
        const propsT = {id:{id :'1'}}
        const propsF ={id:{id :true}}
        it('should not throw a warning', ()=>{
            const result = checkPropTypes(Playlist.propTypes, propsT, 'prop', Playlist.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(Playlist.propTypes, propsF, 'prop', Playlist.name);
            expect(result).toBeDefined();
        });
    });
});



  