/*
 * File: ProfileScreen.js
 * Author: Christian Juth
 * Description:
 *   The profile screen for the current logged in user
 * State: Redux
 */

import React, { useEffect } from 'react';
import { View, AsyncStorage, ActivityIndicator, StyleSheet, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';
import { refreshProfile, RESET } from '../../actions';
import Button from '../../components/StyledButton';
import Image from '../../components/Image';
import Avatar from '../../components/Avatar';

function ProfileScreen(props) {

  function refresh() {
    // prevent double refresh
    if(props.refreshing) return;
    // begin refresh
    props.dispatch(refreshProfile());
  }

  useEffect(() => {
    refresh();
  }, []);

  // update navigation header
  useEffect(() => {
    if(!props.profile) return;
    props.navigation.setParams({
      title: props.profile.username
    });
  }, [props.profile])

  function viewPost(post) {
    props.navigation.navigate('Post', { post });
  }

  if(!props.profile || !props.profile.username)
    return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

  let { profile } = props;

  return(
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={refresh.bind(this)}
        />
      }
    >
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
        <Button mode='outlined'>Edit Profile</Button>
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
    headerRight: (
      <Appbar.Action icon="settings" onPress={() => {
        navigation.navigate('Settings');
      }}/>
    ),
    showBorder: false
  };
}

const mapStateToProps = state => {
  return ({
    profile: state.profile,
    loading: state.profileLoading,
    refreshing: state.profileRefreshing
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
