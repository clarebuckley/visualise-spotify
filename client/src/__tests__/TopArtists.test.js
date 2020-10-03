import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TopArtists from '../components/top-artists/TopArtists';

// Configure enzyme for react 16
Enzyme.configure({ adapter: new Adapter() });

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Top Artists page', () => {
    it('displays loading message when api request is pending', () => {
        const wrapper = shallow(<TopArtists />);
        wrapper.instance().setDataHasLoaded(false);
        expect(wrapper.find('p').text()).toContain('Loading');
    });
});
