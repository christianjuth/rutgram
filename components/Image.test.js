import React from 'react';
import { Image as RNImage } from 'react-native';
import renderer from 'react-test-renderer';
import Image from './Image';

describe('<Image />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Image srouce={{uri: ''}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('two images', () => {
    const tree = renderer.create(<Image/>);
    let images = tree.root.findAllByType(RNImage);
    expect(images.length).toBe(2);
  });
});
