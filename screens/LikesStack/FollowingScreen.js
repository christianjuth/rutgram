import React from 'react';
import { View, ScrollView, Text, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-paper';
import { refreshLikes } from '../../actions';

class LikesScreen extends React.Component{
  static navigationOptions = {
    title: 'Following',
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
    if(this.props.likes == null) return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

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

  bold: {
    fontWeight: 'bold'
  }
});
