import React from 'react';
import { Text } from 'react-native';
import Enzyme, { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import DoubleTap from './DoubleTap';

Enzyme.configure({ adapter: new Adapter() });

test('renders correctly', () => {
  const tree = renderer
    .create(<DoubleTap><Text>content</Text></DoubleTap>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


test('double tap', () => {
  const mockFunc = jest.fn();
  const component = shallow(<DoubleTap onDoubleTap={mockFunc} />);
  component.simulate('press');
  component.simulate('press');
  expect(mockFunc).toHaveBeenCalled();
});
