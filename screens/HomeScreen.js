import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import { Appbar, DefaultTheme, Provider as PaperProvider, Avatar } from 'react-native-paper';
import Constants from 'expo-constants';
import DoubleTap from '../components/DoubleTap';
import PostImage from '../components/Image';
import { connect } from 'react-redux';
import Icon from '../components/Icon';
import { FEED_UPDATE, refreshFeed } from '../actions';


class Home extends React.Component{

  static navigationOptions = {
    header: ({ navigation }) => {
      return(
        <View style={styles.headerWrap}>
          <Appbar style={styles.header}>
            <Appbar.Action/>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image style={{width: 100, height: 60}} resizeMode='contain' source={require('../assets/logo.png')}/>
            </View>
            <Appbar.Action icon="people"/>
          </Appbar>
        </View>
      );
    }
  };

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    // prevent double refresh
    if(this.props.refreshing) return;
    // begin refresh
    this.props.dispatch(refreshFeed());
  }

  like(i, value) {
    let { feed } = this.props;
    feed = feed.slice();
    if(typeof value === 'undefined')
      value = !feed[i].liked;
    feed[i].liked = value;
    this.props.dispatch({
      type: FEED_UPDATE,
      payload: feed
    });
  }

  render() {
    if(this.props.feed.length == 0) return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

    return(

      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.refresh.bind(this)}
          />
        }
      >
        {this.props.feed.map((post, i) => (
          <View key={post.id}>
            <View style={{flexDirection: 'row', padding: 10, paddingLeft: 15}}>
              <Avatar.Image size={40} source={require('../assets/rutgers-avatar.png')} />
              <View style={{justifyContent: 'center', paddingLeft: 10}}>
                <Text style={styles.bold}>{post.profile.displayName}</Text>
                <Text>{post.location}</Text>
              </View>
            </View>
            <DoubleTap onDoubleTap={() => this.like(i, true)}>
              <PostImage source={{uri: post.image.url}}/>
            </DoubleTap>
            <View style={{padding: 15}}>
              <View style={styles.row}>
                <Icon size={30} name={'heart-' + (post.liked ? 'red' : 'o')} onPress={() => this.like(i)} style={{marginRight: 5}}/>
                <Icon size={30} name='message-o'/>
              </View>
              <Text style={styles.p}>Liked by <Text style={styles.bold}>{post.likeCount + (+post.liked)} people</Text></Text>
              <Text style={styles.p}>{post.caption}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return ({
    feed: state.feed,
    refreshing: state.feedLoading
  });
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: '#fff'
  },

  header: {
    elevation: 0,
    marginTop: Constants.statusBarHeight,
    height: 56,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },

  p: {
    marginTop: 8,
    fontSize: 15
  },

  bold: {
    fontWeight: 'bold'
  },

  row: {
    flexDirection: 'row'
  },

  spacer: {
    height: 15
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
