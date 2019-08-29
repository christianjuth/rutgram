import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Appbar, DefaultTheme, Provider as PaperProvider, Avatar, BottomNavigation, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


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
  }
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
  Search: {
    screen: SearchScreen,
    path: 'search',
  }
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
  Camera: {
    screen: CameraScreen,
    path: 'camera',
  }
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
  Likes: {
    screen: LikesScreen,
    path: 'likes',
  }
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
  Profile: {
    screen: ProfileScreen,
    path: 'profile',
  }
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
