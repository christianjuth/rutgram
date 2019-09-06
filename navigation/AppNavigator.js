import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // Authentication set up as suggested by
    // https://reactnavigation.org/docs/en/auth-flow.html
    App: MainTabNavigator
  })
);
