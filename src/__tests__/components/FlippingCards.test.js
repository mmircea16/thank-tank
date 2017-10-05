'use strict';

import React from 'react';
import FlippingCards from '../../components/FlippingCards';
import ThankCard from '../../components/ThankCard';
import { mount } from 'enzyme';
describe('FlippingCards', () => {

    it('renders correctly', () => {
        const wrapper = mount(<FlippingCards />);
        expect(wrapper.find(ThankCard)).toHaveLength(2);
        expect(wrapper.find('.flipped')).toHaveLength(0);
    });
});