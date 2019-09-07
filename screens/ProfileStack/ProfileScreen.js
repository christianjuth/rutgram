import React from 'react';
import { View, AsyncStorage, ActivityIndicator, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Appbar } from 'react-native-paper';
import { refreshProfile, RESET } from '../../actions';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/StyledButton';

class SettingsScreen extends React.PureComponent{
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Appbar.Action icon="settings" onPress={() => {
          navigation.navigate('Settings');
        }}/>
      ),
      showBorder: false
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

    let { profile } = this.props;

    return(
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.stats}>
          <Avatar.Image size={70} source={require('../../assets/rutgers-avatar.png')}/>
          <View style={styles.col}>
            <Text style={[styles.textCenter, styles.bold]}>{profile.posts.length}</Text>
            <Text style={styles.textCenter}>Posts</Text>
          </View>
          <View style={styles.col}>
            <Text style={[styles.textCenter, styles.bold]}>300</Text>
            <Text style={styles.textCenter}>Followers</Text>
          </View>
          <View style={styles.col}>
            <Text style={[styles.textCenter, styles.bold]}>300</Text>
            <Text style={styles.textCenter}>Following</Text>
          </View>
        </View>
        <Text style={styles.bold}>{profile.displayName}</Text>
        <Text>{profile.bio}</Text>
        <View style={styles.spacer}/>
        <Button mode='outlined'>Edit Profile</Button>
      </View>
      </ScrollView>
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


const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f6f6f6'
  },

  header: {
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    padding: 15
  },

  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },

  textCenter: {
    textAlign: 'center'
  },

  bold: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 3
  },

  col: {
    flex: 1
  },

  spacer: {
    height: 15
  }
});
