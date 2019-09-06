import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
  // Authentication set up as suggested by
  // https://reactnavigation.org/docs/en/auth-flow.html
  App: MainTabNavigator
});
switchNavigator.path = '';

export default createBrowserApp(switchNavigator);
