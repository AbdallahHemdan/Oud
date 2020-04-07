import React from 'React'
import renderer from 'react-test-renderer';
import Album from './album';
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import checkPropTypes from 'check-prop-types'

Enzyme.configure({adapter: new EnzymeAdapter()});


const setup = (props={}) =>{
    return shallow(<Album {...props}/>);
}

const findByTestAttr=(wrapper, val)=>{
    return wrapper.find(`[data-testid="${val}"]`);
}
const props = {id:'1'}
describe('album Component', ()=>{
        
    describe('renders correctly', ()=>{
        let component;
        beforeEach (()=>{
            component = setup(props);
        })
        it('renders album component', ()=>{
            const wrapper = findByTestAttr(component, "album");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeader component', ()=>{
            const wrapper = findByTestAttr(component, "playlistHeader");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistIamge component', ()=>{
            const wrapper = findByTestAttr(component, "playlistIamge");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistIamgeContainer component', ()=>{
            const wrapper = findByTestAttr(component, "playlistIamgeContainer");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeaderBody component', ()=>{
            const wrapper = findByTestAttr(component, "playlistHeaderBody");
            expect(wrapper.length).toBe(1);
        });
        it('renders HeaderBodyBottom component', ()=>{
            const wrapper = findByTestAttr(component, "HeaderBodyBottom");
            expect(wrapper.length).toBe(1);
        });
        it('renders HeaderBodyTop component', ()=>{
            const wrapper = findByTestAttr(component, "HeaderBodyTop");
            expect(wrapper.length).toBe(1);
        });
        it('renders songList component', ()=>{
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(1);
        });
    
    })
    describe('checking propTypes', ()=>{
        
        it('should not throw a warning', ()=>{
            const result = checkPropTypes(Album.propTypes, {...props}, 'prop', Album.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(Album.propTypes, {id:true}, 'prop', Album.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(Album.propTypes, {id:1}, 'prop', Album.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(Album.propTypes, {id:{}}, 'prop', Album.name);
            expect(result).toBeDefined();
        });
    });
    describe('snapshot test for the playlist', ()=>{
        it('renders correctly', () => {
            const tree = renderer
              .create(<Album {...props}/>)
              .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
})