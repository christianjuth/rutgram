import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { SET_PROFILE_ID } from '../actions';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userId = await AsyncStorage.getItem('userId');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    await this.props.dispatch({
      type: SET_PROFILE_ID,
      payload: userId
    });
    this.props.navigation.navigate(userId ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <ActivityIndicator style={{flex: 1}} color='#000'/>
    );
  }
}

export default connect()(AuthLoadingScreen);
