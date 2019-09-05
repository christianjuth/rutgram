import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-paper';

class SettingsScreen extends React.PureComponent{
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.username != this.props.username)
      this.updateHeader(newProps)
  }

  updateHeader(props = this.props) {
    this.props.navigation.setParams({
      title: props.username
    });
  }

  componentDidMount() {
    this.updateHeader();
  }

  render() {
    return(
      <View></View>
    );
  }
}

const mapStateToProps = state => {
  return ({
    username: state.username
  });
}

export default connect(mapStateToProps)(SettingsScreen);
