import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  AppState
} from 'react-native';
import { Avatar } from 'react-native-paper';
import DoubleTap from '../components/DoubleTap';
import PostImage from '../components/Image';
import { connect } from 'react-redux';
import Icon from '../components/Icon';

class Post extends React.Component{
  static navigationOptions = {
    title: 'Post'
  }

  constructor(props) {
    super(props);
    let post = this.props.navigation.state.params.post;
    post.liked = post.likes.map(l => l.profile.id).includes(this.props.profileId);
    this.state = { post };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.updatePost);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.updatePost);
    this.updatePost();
  }

  async updatePost() {
    let originalPost = this.props.navigation.state.params.post;
    if(originalPost.likes.length != this.getLikeCount())
      console.log("Post data to server");
  }

  like(value) {
    let post = Object.assign({}, this.state.post);
    if(typeof value === 'undefined')
      value = !post.liked;
    post.liked = value;
    this.setState({ post });
  }

  getLikeCount() {
    let { post } = this.state,
        liked = post.likes.map(l => l.profile.id).includes(this.props.profileId),
        likeCount = post.likes.length;
    if(liked && !post.liked) likeCount--;
    else if(!liked && post.liked) likeCount++;
    return likeCount;
  }

  render() {
    let { post } = this.state;

    return(
      <ScrollView>
        <View style={{flexDirection: 'row', padding: 10, paddingLeft: 15}}>
          <Avatar.Image size={40} source={require('../assets/rutgers-avatar.png')} />
          <View style={{justifyContent: 'center', paddingLeft: 10}}>
            <Text style={styles.bold}>{post.profile.displayName}</Text>
            <Text>{post.location}</Text>
          </View>
        </View>
        <DoubleTap onDoubleTap={() => this.like(true)}>
          <PostImage source={{uri: post.image.url}}/>
        </DoubleTap>
        <View style={{padding: 15}}>
          <View style={styles.row}>
            <Icon size={30} name={'heart-' + (post.liked ? 'red' : 'o')} onPress={() => this.like()} style={{marginRight: 5}}/>
            <Icon size={30} name='message-o'/>
          </View>
          <Text style={styles.p}>Liked by <Text style={styles.bold}>{this.getLikeCount()} people</Text></Text>
          <Text style={styles.p}>{post.caption}</Text>
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

export default connect(mapStateToProps)(Post);

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
