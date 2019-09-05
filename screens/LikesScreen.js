import React from 'react';
import { View, ScrollView, Text, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { refreshLikes } from '../actions';

class LikesScreen extends React.Component{
  static navigationOptions = {
    title: 'Likes',
  };

  state = {
    likes: []
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    // prevent double refresh
    if(this.props.refreshing) return;
    // begin refresh
    this.props.dispatch(refreshLikes());
  }

  render() {
    if(this.props.likes.length == 0) return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

    return(
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.refresh.bind(this)}
          />
        }
      >
        {this.props.likes.map(l => (
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

const mapStateToProps = state => {
  return ({
    likes: state.likes,
    refreshing: state.likesLoading
  });
}

export default connect(mapStateToProps)(LikesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
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

  bold: {
    fontWeight: 'bold'
  }
});
