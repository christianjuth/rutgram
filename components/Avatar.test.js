import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from './Avatar';

it('renders correctly', () => {
  const tree = renderer
    .create(<Avatar size={40}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
