'use strict';

import React from 'react';
import ThankCard from '../../components/ThankCard';
import renderer from 'react-test-renderer';

describe("ThankCard", () => {
  it('renders correctly if secret is yes', () => {
    const tree = renderer
      .create(<ThankCard className='testClass' row={{from: 'Anonymous', name: 'Thanking to', message:'message'}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly if secret is no', () => {
    const tree = renderer
      .create(<ThankCard className='testClass' row={{from: 'email', name: 'Thanking to', message:'message'}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});