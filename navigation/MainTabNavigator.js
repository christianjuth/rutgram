import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import { Appbar, DefaultTheme, Provider as PaperProvider, Avatar, BottomNavigation, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import Icon from '../components/Icon';


// home stack
import HomeScreen from '../screens/HomeStack/HomeScreen';
// search stack
import SearchScreen from '../screens/SearchScreen';
// camera stack
import CameraScreen from '../screens/CameraScreen';
// likes stack
import FollowingScreen from '../screens/LikesStack/FollowingScreen';
import YouScreen from '../screens/LikesStack/YouScreen';
// profiles stack
import ProfileScreen from '../screens/ProfileStack/ProfileScreen';
import SettingsScreen from '../screens/ProfileStack/SettingsScreen';


const config = {
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: (props) => {
      let { descriptor, index, route } = props.scene,
          { options, navigation, showBorder } = descriptor,
          { params } = route,
          title = options.title;

      if(params && params.title)
        title = params.title;

      return(
        <Appbar.Header style={showBorder === false ? styles.headerNoBorder : styles.header}>
          {index > 0 ? (<Appbar.BackAction onPress={() => navigation.goBack()}/>) : null}
          {options.headerLeft}
          <Appbar.Content title={title}/>
          {options.headerRight}
        </Appbar.Header>
      );
    }
  },
  tabBarOptions: {
    upperCaseLabel: false,
    labelStyle: {
      fontWeight: 'bold',
      fontSize: 15
    },
    style: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#f6f6f6',
    },
    activeTintColor: '#000',
    inactiveTintColor: 'gray',
    // style indicator to look like
    // the official instagram app
    indicatorStyle: {
      backgroundColor: 'transparent',
      borderTopWidth: 1,
      borderColor: '#000'
    }
  }
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    borderBottomWidth: 0.5,
    borderColor: '#aaa'
  },
  header: {
    elevation: 0
  }
});




const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    path: '',
  },
  Camera: {
    screen: CameraScreen,
    path: 'camera'
  }
}, config);
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'home' + (focused ? '' : '-o')}/>
  ),
};
HomeStack.path = 'home';



const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    path: '',
  }
}, config);
SearchStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'search' + (focused ? '' : '-o')}/>
  ),
};
SearchStack.path = 'search';



const CameraStack = createStackNavigator({
  Camera: {
    screen: CameraScreen,
    path: '',
  }
}, config);
CameraStack.navigationOptions = {
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'add-box' + (focused ? '' : '-o')}/>
  ),
};
CameraStack.path = 'camera';


const LikesStack = createMaterialTopTabNavigator({
  Following: {
    screen: FollowingScreen,
    path: 'following',
  },
  You: {
    screen: YouScreen,
    path: 'you',
  }
}, config);
LikesStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'heart' + (focused ? '' : '-o')}/>
  ),
};
LikesStack.path = 'likes';



const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    path: '',
  },
  Settings: {
    screen: SettingsScreen,
    path: 'settings'
  }
}, config);
ProfileStack.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index == 0,
  tabBarIcon: ({ focused }) => (
    <Icon size={30} name={'person' + (focused ? '' : '-o')}/>
  ),
});
ProfileStack.path = 'profile';



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
tabNavigator.path = 'app';


export default tabNavigator;
