import React from 'react';
import { AsyncStorage, TextInput, Image, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { request } from 'graphql-request';
import { connect } from 'react-redux';
import { SET_PROFILE_ID } from '../actions';
import Button from '../components/StyledButton';

const endpoint = 'https://api-useast.graphcms.com/v1/ck041h6kf0eri01bx3rtqe0du/master';

class SignInScreen extends React.Component {
  state = {
    username: '',
    loading: true
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userId = await AsyncStorage.getItem('userId');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if(userId){
      this.props.dispatch({
        type: SET_PROFILE_ID,
        payload: userId
      });
    } else{
      this.setState({
        loading: false
      });
    }
  };

  async login() {
    let { username } = this.state;

    const query = `{
      profile(where: {username: "${username}"}){
        id
      }
    }`;

    let { profile } = await request(endpoint, query);

    if(profile == null){
      alert('user not found');
    } else{
      this.setUser(profile);
    }
  }

  async setUser(profile) {
    AsyncStorage.setItem('userId', profile.id);
    await this.props.dispatch({
      type: SET_PROFILE_ID,
      payload: profile.id
    });
  }

  onChangeText(username) {
    this.setState({ username });
  }



  render() {

    if(this.state.loading){
      return(
        <ActivityIndicator style={{flex: 1}} color='#000'/>
      );
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
      >
        <Image
          style={[styles.logo, styles.spacing]}
          resizeMode='contain'
          source={require('../assets/logo.png')}
        />
        <TextInput
          style={[styles.textInput, styles.spacing]}
          placeholder='Username'
          onChangeText={this.onChangeText.bind(this)}
          value={this.state.username}
          autoCapitalize='none'
        />
        <Button onPress={this.login.bind(this)}>Log in</Button>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return ({
    profileId: state.profileId
  });
};

export default connect(mapStateToProps)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  logo: {
    width: '100%',
    height: 50
  },

  textInput: {
    backgroundColor: '#eee',
    height: 40,
    padding: 10,
    borderRadius: 4
  },

  spacing: {
    marginBottom: 10
  }
});
