import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Avatar from './Avatar';

configure({ adapter: new Adapter() });

describe('<Avatar />', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(<Avatar size={40}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onPress fires correctly', () => {
    const mockFunc = jest.fn();
    const component = shallow(<Avatar onPress={mockFunc}/>);
    component.simulate('press');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
