import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Appbar, DefaultTheme, Provider as PaperProvider, Avatar, BottomNavigation, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import Icon from '../components/Icon';


import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CameraScreen from '../screens/CameraScreen';
import LikesScreen from '../screens/LikesScreen';
import ProfileScreen from '../screens/ProfileScreen';


const config = {
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: (props) => {
      return(
        <Appbar.Header style={styles.header}>
          <Appbar.Content title={props.scene.descriptor.options.title}/>
        </Appbar.Header>
      );
    }
  }
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  }
});




const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    path: 'home',
  },
  Camera: {
    screen: CameraScreen,
    path: 'home/camera'
  }
}, config);
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'home' + (focused ? '' : '-o')}/>
  ),
};
HomeStack.path = '';



const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    path: 'search',
  }
}, config);
SearchStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'search' + (focused ? '' : '-o')}/>
  ),
};
SearchStack.path = '';



const CameraStack = createStackNavigator({
  Camera: {
    screen: CameraScreen,
    path: 'camera',
  }
}, config);
CameraStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'add-box' + (focused ? '' : '-o')}/>
  ),
};
CameraStack.path = '';


const LikesStack = createStackNavigator({
  Likes: {
    screen: LikesScreen,
    path: 'likes',
  }
}, config);
LikesStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'heart' + (focused ? '' : '-o')}/>
  ),
};
LikesStack.path = '';



const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    path: 'profile',
  }
}, config);
ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'person' + (focused ? '' : '-o')}/>
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
