/*
 * File: ProfileScreen.js
 * Author: Christian Juth
 * Description:
 *   The profile screen for any user
 * State: component state
 */

import React from 'react';
import { View, AsyncStorage, ActivityIndicator, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';
import { refreshProfile, RESET } from '../../actions';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/StyledButton';
import Image from '../../components/Image'
import { request } from 'graphql-request';
import Avatar from '../../components/Avatar';

class ProfileScreen extends React.PureComponent{
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.profile.displayName,
      showBorder: false
    };
  }

  state = {
    profile: {}
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    // prevent double refresh
    if(this.props.refreshing) return;
    let profileId = this.props.navigation.state.params.profile.id;
    // begin refresh
    const query = `{
      profile(where: { id: "${profileId}" }){
        username
        displayName
        bio
        profilePicture{
          url
        }
        followers{
          fan{
            id
            username
          }
        }
        following{
          fan{
            id
            username
          }
        }
        posts(orderBy: createdAt_DESC){
          id
          location
          caption
          likes{
            profile{
              id
              username
            }
          }
          profile{
            displayName
          }
          image{
            url
          }
        }
      }
    }`;

    request(global.endpoint, query)
    .then(data => {
      this.setState({
        profile: data.profile
      });
    });
  }

  viewPost(post) {
    this.props.navigation.navigate('Post', { post });
  }

  toggleFollow() {
    console.log('implement toogle follow button');
  }

  render() {
    if(!this.state.profile.username)
      return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

    let { profile } = this.state;

    return(
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.stats}>
            <Avatar size={80} source={{uri: profile.profilePicture.url}}/>
            <View style={styles.col}>
              <Text style={[styles.textCenter, styles.bold]}>{profile.posts.length}</Text>
              <Text style={styles.textCenter}>Posts</Text>
            </View>
            <View style={styles.col}>
              <Text style={[styles.textCenter, styles.bold]}>{profile.followers.length}</Text>
              <Text style={styles.textCenter}>Followers</Text>
            </View>
            <View style={styles.col}>
              <Text style={[styles.textCenter, styles.bold]}>{profile.following.length}</Text>
              <Text style={styles.textCenter}>Following</Text>
            </View>
          </View>
          <Text style={styles.bold}>{profile.displayName}</Text>
          <Text>{profile.bio}</Text>
          <View style={styles.spacer}/>
          <Button onPress={this.toggleFollow}>Follow</Button>
        </View>

        <View style={styles.posts}>
          {profile.posts.map(p => (
            <TouchableOpacity
              key={p.id}
              style={{width: 100/3+'%'}}
              onPress={() => this.viewPost(p)}
              activeOpacity={0.9}
            >
              <Image source={{uri: p.image.url}}/>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return ({
    profileId: state.profileId
  });
}

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f6f6f6'
  },

  header: {
    borderBottomWidth: 1,
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
  },

  posts: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
});
