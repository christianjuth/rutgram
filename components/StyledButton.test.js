import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Button from './StyledButton';

Enzyme.configure({ adapter: new Adapter() });


test('blue button renders correctly', () => {
  const tree = renderer
    .create(<Button>Blue Button</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


test('outline button renders correctly', () => {
  const tree = renderer
    .create(<Button mode='outlined'>Outline Button</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


test('press button', () => {
  const mockFunc = jest.fn();
  const component = shallow(<Button onPress={mockFunc}>Outline Button</Button>);
  component.simulate('press');
  expect(mockFunc).toHaveBeenCalled();
});
