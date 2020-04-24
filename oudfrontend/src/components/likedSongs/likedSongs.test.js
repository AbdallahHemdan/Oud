import React from 'React'
import renderer from 'react-test-renderer';
import LikedSongs from './likedSongs';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new EnzymeAdapter()});


const setup = () =>{
    return shallow(<LikedSongs.WrappedComponent/>);
}

const findByTestAttr=(wrapper, val)=>{
    return wrapper.find(`[data-testid="${val}"]`);
}
describe('album Component', ()=>{
        
    describe('renders correctly', ()=>{
        let component;
        beforeEach (()=>{
            component = setup();
        })
        it('renders album component', ()=>{
            const wrapper = findByTestAttr(component, "wrapper");
            expect(wrapper.length).toBe(1);
        });
        it('renders playlistHeader component', ()=>{
            const wrapper = findByTestAttr(component, "sidebar");
            expect(wrapper.length).toBe(1);
        });
        it('renders album component', ()=>{
            const wrapper = findByTestAttr(component, "likedSongs");
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
        
        it('renders songList component', ()=>{
            const wrapper = findByTestAttr(component, "songList");
            expect(wrapper.length).toBe(1);
        });
    
    })
    
   /* describe('snapshot test', ()=>{
        it('renders correctly', () => {
            const tree = renderer
              .create(<LikedSongs.WrappedComponent/>)
              .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });*/
})