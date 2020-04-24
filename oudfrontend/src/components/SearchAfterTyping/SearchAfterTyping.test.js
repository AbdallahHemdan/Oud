import React from "react";
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import { findByTestAttr } from "./../../utils/index"
import SearchAfterTyping from './SearchAfterTyping';
import checkPropTypes from 'check-prop-types'

const setup = (props = {}) => {
  const component = shallow(
    <SearchAfterTyping {...props} />
  )
  return component;
}
const item = {
  search: "Amr",
  canSend: true,
}
describe('Search After Typing component', () => {
  let component;
  beforeEach(() => {
    const props = {
      item
    }
    component = setup(props);
  })
  it('Should render loading in case of loading data', () => {
    component.setState({ isLoading: true })
    const wrapper = findByTestAttr(component, "loading");
    expect(component.state().isLoading).toBeTruthy();
    expect(wrapper.length).toBe(1);
  });
  it('Should render search results wrapper in right way', () => {
    component.setState({ isLoading: false })
    const wrapper = findByTestAttr(component, "search-results");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });
  it('Should render search result tracks in right way', () => {
    component.setState({ isLoading: false })
    const wrapper = findByTestAttr(component, "search-tracks");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });
  it('Should render search result artists in right way', () => {
    component.setState({ isLoading: false })
    const wrapper = findByTestAttr(component, "search-artists");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });
  it('Should render search result albums in right way', () => {
    component.setState({ isLoading: false })
    const wrapper = findByTestAttr(component, "search-albums");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });
  it('Should render search result playlists in right way', () => {
    component.setState({ isLoading: false })
    const wrapper = findByTestAttr(component, "search-playlists");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });
  it('Should render search result users in right way', () => {
    component.setState({ isLoading: false })
    const wrapper = findByTestAttr(component, "search-users");
    expect(component.state().isLoading).toBeFalsy();
    expect(wrapper.length).toBe(1);
  });

  describe('snapshot test', () => {
    it('renders component correctly', () => {
      const fullProps = { search: "Hemdan", canSend: true };
      const tree = renderer
        .create(<SearchAfterTyping {...fullProps} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('testing prop types', () => {
    it('should pass true props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { ...item }, 'prop', SearchAfterTyping.name);
      expect(result).toBeUndefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { search: 0 }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { search: true }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { search: jest.fn }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { search: [15] }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { search: {} }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { canSend: 0 }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { canSend: "" }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { canSend: jest.fn }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { canSend: [15] }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
    it('should pass false props', () => {
      const result = checkPropTypes(SearchAfterTyping.propTypes, { canSend: {} }, 'prop', SearchAfterTyping.name);
      expect(result).toBeDefined();
    });
  })
});



