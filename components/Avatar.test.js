import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Avatar from './Avatar';

Enzyme.configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const tree = renderer
    .create(<Avatar size={40}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('double tap', () => {
  const mockFunc = jest.fn();
  const component = shallow(<Avatar onPress={mockFunc}/>);
  component.simulate('press');
  expect(mockFunc).toHaveBeenCalled();
});
