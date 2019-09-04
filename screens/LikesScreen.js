import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { request } from 'graphql-request';
import { Avatar } from 'react-native-paper';

export default class SettingsScreen extends React.Component{
  static navigationOptions = {
    title: 'Likes',
  };

  state = {
    likes: []
  }

  componentDidMount() {
    this.refresh();
  }

  async refresh(search) {
    const query = `{
      likes{
        id
        profile{
          username
        }
      }
    }`;

    let data = await request(global.apiEndpoint, query);
    this.setState({ likes: data.likes });
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        {this.state.likes.map(l => (
          <View key={l.id} style={styles.row}>
            <Avatar.Image size={40} style={styles.avatar} source={require('../assets/rutgers-avatar.png')} />
            <View>
              <Text style={styles.bold}>{l.profile.username}</Text>
              <Text>liked your photo</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
