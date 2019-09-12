import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Button from './StyledButton';

configure({ adapter: new Adapter() });

describe('<StyledButton />', () => {

  it('blue button renders correctly', () => {
    const tree = renderer
      .create(<Button>Blue Button</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('outline button renders correctly', () => {
    const tree = renderer
      .create(<Button mode='outlined'>Outline Button</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onPress fires correctly', () => {
    const mockFunc = jest.fn();
    const component = shallow(<Button onPress={mockFunc}>Outline Button</Button>);
    component.simulate('press');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
