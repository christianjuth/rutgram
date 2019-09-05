import React from 'react';
import { View, AsyncStorage, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { refreshProfile, RESET } from '../actions';

class SettingsScreen extends React.PureComponent{
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    // prevent double refresh
    if(this.props.refreshing) return;
    // begin refresh
    this.props.dispatch(refreshProfile());
  }

  componentWillReceiveProps(newProps) {
    if(newProps.profile != this.props.profile)
      this.updateHeader(newProps)
  }

  updateHeader(props = this.props) {
    if(!props.profile) return;
    this.props.navigation.setParams({
      title: props.profile.username
    });
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    await this.props.dispatch({ type: RESET });
    this.props.navigation.navigate('Auth');
  };

  render() {
    if(!this.props.profile || !this.props.profile.username)
      return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

    return(
      <View>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return ({
    refreshing: state.profileLoading,
    profile: state.profile
  });
}

export default connect(mapStateToProps)(SettingsScreen);
