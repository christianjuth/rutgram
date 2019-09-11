/*
 * File: ProfileScreen.js
 * Author: Christian Juth
 * Description:
 *   The profile screen for any user
 * State: component state
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { request } from 'graphql-request';
import Avatar from '../../components/Avatar';
import Button from '../../components/StyledButton';
import Image from '../../components/Image';

function ProfileScreen(props) {

  const [profile, setProfile] = useState({});

  function refresh() {
    // prevent double refresh
    if(props.refreshing) return;
    let profileId = props.navigation.state.params.profile.id;
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
            profilePicture{
              url
            }
          }
          image{
            url
          }
        }
      }
    }`;

    request(global.endpoint, query)
    .then(data => {
      setProfile( data.profile );
    });
  }

  // componentDidMount
  useEffect(() => {
    refresh();
  }, []);

  function viewPost(post) {
    props.navigation.navigate('Post', { post });
  }

  function toggleFollow() {
    console.log('implement toogle follow button');
  }

  if(!profile.username)
    return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

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
        <Button onPress={toggleFollow}>Follow</Button>
      </View>

      <View style={styles.posts}>
        {profile.posts.map(p => (
          <TouchableOpacity
            key={p.id}
            style={{width: 100/3+'%'}}
            onPress={() => viewPost(p)}
            activeOpacity={0.9}
          >
            <Image source={{uri: p.image.url}}/>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

ProfileScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.state.params.profile.displayName,
    showBorder: false
  };
};

const mapStateToProps = state => {
  return ({
    profileId: state.profileId
  });
};

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
