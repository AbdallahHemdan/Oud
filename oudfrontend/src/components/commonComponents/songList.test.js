import React from 'React'
import SongList from './songList';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import checkPropTypes from 'check-prop-types'

Enzyme.configure({adapter: new EnzymeAdapter()});


const setup = (props={}) =>{
    return shallow(<SongList {...props}/>);
}

const findByTestAttr=(wrapper, val)=>{
    return wrapper.find(`[data-testid="${val}"]`);
}
describe('SongList Component', ()=>{
    describe('testing SongList Component with recieved equal false',()=>{
        let component;
        let props = {recieved:false}
        beforeEach (()=>{
            component = setup(props);
        })
        it('renders songsList correctly when recived = false', ()=>{
            const wrapper = findByTestAttr(component, 'songsList');
            expect(wrapper.length).toBe(1);
        });
        it("doesn't render songElement when recived = false", ()=>{
            const wrapper = findByTestAttr(component, 'songElement');
            expect(wrapper.length).toBe(0);
        });it('renders loading correctly when recived = false', ()=>{
            const wrapper = findByTestAttr(component, 'loading');
            expect(wrapper.length).toBe(1);
        });
    });
    
    describe('testing SongList Component without props',()=>{
        let component;
        beforeEach (()=>{
            component = setup();
        })
        it('renders songsList correctly when without props', ()=>{
            const wrapper = findByTestAttr(component, 'songsList');
            expect(wrapper.length).toBe(1);
        });
        it("doesn't render songElement when without props", ()=>{
            const wrapper = findByTestAttr(component, 'songElement');
            expect(wrapper.length).toBe(0);
        });it('renders loading correctly when without props', ()=>{
            const wrapper = findByTestAttr(component, 'loading');
            expect(wrapper.length).toBe(1);
        });
    });
    
    describe('testing SongList Component with recieved equal true and tracks is empty',()=>{
        let component;
        let props = {recieved:true, tracks:[]}
        beforeEach (()=>{
            component = setup(props);
        })
        it('render songsList correctly when recived = true and tracks is empty', ()=>{
            const wrapper = findByTestAttr(component, 'songsList');
            expect(wrapper.length).toBe(1);
        });
        it("doesn't render songElement when recived = true and tracks is empty", ()=>{
            const wrapper = findByTestAttr(component, 'songElement');
            expect(wrapper.length).toBe(0);
        });it('does not render loading when recived = true and tracks is empty', ()=>{
            const wrapper = findByTestAttr(component, 'loading');
            expect(wrapper.length).toBe(0);
        });
    });
    
    describe('testing SongList Component with recieved equal true and tracks not empty',()=>{
        let component;
        let props = {recieved:true, tracks:[{"id": "11",
        "name": "Hat Sogara",
        "artists": [
          {
            "id": "1",
            "name": "Danny Willok",
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
        "albumId": "1",
        "type": "Jazz",
        "audioUrl": "www.Facebook.com"
      }]}
        beforeEach (()=>{
            component = setup(props);
        })
        it('render songsList correctly when recived = true and tracks not empty', ()=>{
            const wrapper = findByTestAttr(component, 'songsList');
            expect(wrapper.length).toBe(1);
        });
        it("doesn't render songElement when recived = true and tracks is not empty", ()=>{
            const wrapper = findByTestAttr(component, 'songElement');
            expect(wrapper.length).toBe(1);
        });it('does not render loading when recived = true and tracks not empty', ()=>{
            const wrapper = findByTestAttr(component, 'loading');
            expect(wrapper.length).toBe(0);
        });
    });

    describe('checking propTypes', ()=>{
        const props10 ={recieved:true, tracks:{}}
        const props11 ={recieved:true, tracks:[]}
        const props01 ={recieved:4, tracks:[]}
        const props00 ={recieved:4, tracks:{}}

        it('should not throw a warning', ()=>{
            const result = checkPropTypes(SongList.propTypes, props11, 'prop', SongList.name);
            expect(result).toBeUndefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(SongList.propTypes, props10, 'prop', SongList.name);
            console.log(result);
            expect(result).toBeDefined();
        });
        it('should not throw a warning', ()=>{
            const result = checkPropTypes(SongList.propTypes, props01, 'prop', SongList.name);
            expect(result).toBeDefined();
        });
        it('should throw a warning', ()=>{
            const result = checkPropTypes(SongList.propTypes, props00, 'prop', SongList.name);
            console.log(result);
            expect(result).toBeDefined();
        });
    });
});
