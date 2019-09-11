import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { refreshLikes } from '../../redux/actions';
import { reduxPropTypes } from '../../propTypes';
import Image from '../../components/Image';


function LikesScreen(props) {

  function refresh() {
    // prevent double refresh
    if(props.refreshing) return;
    // begin refresh
    props.dispatch(refreshLikes());
  }

  useEffect(() => {
    refresh();
  }, []);

  if(props.likes == null)
    return(<ActivityIndicator color="#000" style={styles.container}/>);

  return(
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={refresh}
        />
      }
    >
      {props.likes.map(l => (
        <View key={l.id} style={styles.row}>
          <Avatar.Image size={45} style={styles.avatar} source={{uri: l.profile.profilePicture.url}} />
          <View style={{flex: 1}}>
            <Text><Text style={styles.bold}>{l.profile.username}</Text> liked your post.</Text>
          </View>
          <View style={styles.postImage}>
            <Image source={{uri: l.post.image.url}}/>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return ({
    likes: state.likes,
    refreshing: state.likesLoading
  });
};

LikesScreen.propTypes = {
  ...reduxPropTypes,
  refreshing: PropTypes.bool,
  likes: PropTypes.array
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  row: {
    flexDirection: 'row',
    padding: 15,
    paddingTop: 10,
    paddingBottom: 5
  },

  avatar: {
    marginRight: 10
  },

  postImage: {
    height: 45,
    width: 45
  },

  bold: {
    fontWeight: 'bold'
  }
});

export default connect(mapStateToProps)(LikesScreen);
