import React from 'react';
import { View, AsyncStorage, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Appbar } from 'react-native-paper';
import { refreshProfile, RESET } from '../../actions';
import { Ionicons } from '@expo/vector-icons';

class SettingsScreen extends React.PureComponent{
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Appbar.Action icon="settings" onPress={() => {
          navigation.navigate('Settings');
        }}/>
      )
    };
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

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    // prevent double refresh
    if(this.props.refreshing) return;
    // begin refresh
    this.props.dispatch(refreshProfile());
  }

  render() {
    if(!this.props.profile || !this.props.profile.username)
      return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

    return(
      <View></View>
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
