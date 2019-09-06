import React from 'react';
import { View, AsyncStorage, TextInput, Image, StyleSheet } from 'react-native';
// import { Button } from 'react-native-paper';
import { request } from 'graphql-request';
import { connect } from 'react-redux';
import { SET_PROFILE_ID } from '../../actions';
import Button from '../../components/StyledButton';

const endpoint = 'https://api-useast.graphcms.com/v1/ck041h6kf0eri01bx3rtqe0du/master';

class SignInScreen extends React.Component {
  state = {
    username: ''
  }

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
    this.props.navigation.navigate('App');
  }

  onChangeText(username) {
    this.setState({ username });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={[styles.logo, styles.spacing]}
          resizeMode='contain'
          source={require('../../assets/logo.png')}
        />
        <TextInput
          style={[styles.textInput, styles.spacing]}
          placeholder='Username'
          onChangeText={this.onChangeText.bind(this)}
          value={this.state.username}
          autoCapitalize='none'
        />
        <Button onPress={this.login.bind(this)}>Log in</Button>
      </View>
    );
  }
}

export default connect()(SignInScreen);

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
