import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Avatar } from 'react-native-paper';
import { request } from 'graphql-request';

export default class SettingsScreen extends React.Component{
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
    this.onChangeText = this.onChangeText.bind(this);
  }

  handleSearch(search) {
    const query = `{
      profiles
      (where: {
        OR: [
          { username_contains: "${search}" }
          { displayName_contains: "${search}" }
        ]
      }){
        id
        username
        displayName
      }
    }`;

    request(global.apiEndpoint, query)
    .then(data => {
      this.setState({
        results: data.profiles
      });
    });
  }

  onChangeText(text) {
    if(this.timeout) clearInterval(this.timeout);

    if(text == ''){
      this.setState({
        results: []
      });
      return;
    }

    this.timeout = setTimeout(() => {
      this.handleSearch(text);
    }, 300);
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TextInput
            style={styles.headerInput}
            onChangeText={this.onChangeText}
            placeholder='Search Accounts'
          />
        </View>

        <View style={{flex: 1}}>
          {this.state.results.map(r => (
            <View key={r.id} style={styles.row}>
              <Avatar.Image size={40} style={styles.avatar} source={require('../assets/rutgers-avatar.png')} />
              <View>
                <Text style={styles.bold}>{r.username}</Text>
                <Text>{r.displayName}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    padding: 10,
    paddingTop: Constants.statusBarHeight || 10,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },

  headerInput: {
    borderRadius: 10,
    height: 40,
    padding: 10,
    backgroundColor: '#eee',
    fontSize: 18
  },

  row: {
    flexDirection: 'row',
    padding: 15,
    paddingTop: 18,
    paddingBottom: 0
  },

  avatar: {
    marginRight: 10
  },

  bold: {
    fontWeight: 'bold'
  }
});
