import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import DoubleTap from '../../components/DoubleTap';
import PostImage from '../../components/Image';
import { connect } from 'react-redux';
import Icon from '../../components/Icon';
import { FEED_UPDATE, refreshFeed } from '../../redux/actions';
import { reduxPropTypes } from '../../propTypes';
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
    feed = Object.assign({}, feed);
    if(typeof value === 'undefined')
      value = !feed.posts[i].liked;
    feed.posts[i].liked = value;
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
        <ScrollView horizontal={true} style={styles.avatarWrap}>
          {this.props.feed.celebrities.map(c => (
            <View key={c.id} style={styles.avatar}>
              <Avatar size={55} source={{uri: c.profilePicture.url}} />
              <Text numberOfLines={1} ellipsizeMode='head' style={styles.avatarUsername}>{c.username}</Text>
            </View>
          ))}
        </ScrollView>
        {this.props.feed.posts.map((post, i) => (
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

Home.propTypes = {
  ...reduxPropTypes
};

const mapStateToProps = state => {
  return ({
    feed: state.feed,
    loading: state.feedLoaded,
    refreshing: state.feedRefreshing
  });
};

const styles = StyleSheet.create({

  avatarWrap: {
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },

  avatar: {
    width: 90,
    alignItems: 'center'
  },

  avatarUsername: {
    textAlign: 'center',
    marginTop: 5
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

export default connect(mapStateToProps)(Home);
