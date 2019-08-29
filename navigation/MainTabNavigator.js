import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Appbar, DefaultTheme, Provider as PaperProvider, Avatar, BottomNavigation, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CameraScreen from '../screens/CameraScreen';
import LikesScreen from '../screens/LikesScreen';
import ProfileScreen from '../screens/ProfileScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});



const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, config);
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      size={30}
      name={'home'}
    />
  ),
};
HomeStack.path = '';



const SearchStack = createStackNavigator({
  Search: SearchScreen,
}, config);
SearchStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      size={30}
      name={'search'}
    />
  ),
};
SearchStack.path = '';



const CameraStack = createStackNavigator({
  Camera: CameraScreen,
}, config);
CameraStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      size={30}
      name={'add-box'}
    />
  ),
};
CameraStack.path = '';


const LikesStack = createStackNavigator({
  Likes: LikesScreen,
}, config);
LikesStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      size={30}
      name={'heart'}
    />
  ),
};
LikesStack.path = '';



const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
}, config);
ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      size={30}
      name={'person'}
    />
  ),
};
ProfileStack.path = '';



const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SearchStack,
  CameraStack,
  LikesStack,
  ProfileStack
}, {
  tabBarOptions: {
    showLabel: false
  }
});
tabNavigator.path = '';


export default tabNavigator;
