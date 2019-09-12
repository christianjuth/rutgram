import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Icon from './Icon';

configure({ adapter: new Adapter() });

describe('<DoubleTap />', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(<Icon name='person'/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('onPress fires correctly', () => {
    const mockFunc = jest.fn();
    const component = shallow(<Icon onPress={mockFunc} name='person'/>);
    component.simulate('press');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
