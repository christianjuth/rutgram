import React from 'react';
import { View, AsyncStorage, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { RESET } from '../../actions';
import Button from '../../components/StyledButton';

class SettingsScreen extends React.PureComponent{
  static navigationOptions = {
    title: 'Settings',
    tabBarVisible: false,
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    await this.props.dispatch({ type: RESET });
    this.props.navigation.navigate('Auth');
  };

  render() {
    return(
      <View style={styles.container}>
        <Button mode='outlined' onPress={this._signOutAsync}>Sign out</Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return ({
    refreshing: state.profileLoading,
    profile: state.profile
  });
};

export default connect(mapStateToProps)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    padding: 10
  }
});
