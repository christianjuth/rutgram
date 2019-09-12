import React from 'react';
import { Text } from 'react-native';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import DoubleTap from './DoubleTap';

configure({ adapter: new Adapter() });

describe('<DoubleTap />', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(<DoubleTap><Text>content</Text></DoubleTap>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onDoubleTap fires correctly', () => {
    const mockFunc = jest.fn();
    const component = shallow(<DoubleTap onDoubleTap={mockFunc} />);
    component.simulate('press');
    expect(mockFunc).toHaveBeenCalledTimes(0);
    component.simulate('press');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
