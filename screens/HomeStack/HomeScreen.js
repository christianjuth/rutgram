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
import DoubleTap from '../../components/DoubleTap';
import PostImage from '../../components/Image';
import { connect } from 'react-redux';
import Icon from '../../components/Icon';
import { FEED_UPDATE, refreshFeed } from '../../actions';
import Header from './Header';
import Avatar from '../../components/Avatar';


class Home extends React.PureComponent{
  static navigationOptions = {
    header: ({ navigation }) => (<Header navigation={navigation}/>)
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

  viewProfile(profile) {
    this.props.navigation.navigate('Profile', { profile });
  }

  render() {
    if(this.props.loading) return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

    return(
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={this.props.refreshing}
            onRefresh={this.refresh.bind(this)}
          />
        }
      >
        <View style={{flexDirection: 'row', padding: 8, borderBottomWidth: 1, borderColor: '#ddd'}}>
          <Avatar size={60}/>
        </View>
        {this.props.feed.map((post, i) => (
          <View key={post.id}>
            <View style={{flexDirection: 'row', padding: 10, paddingLeft: 12}}>
              <Avatar size={40} source={{uri: post.profile.profilePicture.url}}/>
              <View style={{justifyContent: 'center', paddingLeft: 10}}>
                <Text style={styles.bold} onPress={() => this.viewProfile(post.profile)}>{post.profile.displayName}</Text>
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
    loading: state.feedLoaded,
    refreshing: state.feedRefreshing
  });
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
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
