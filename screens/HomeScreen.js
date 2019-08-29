import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  ScrollView
} from 'react-native';
import { Appbar, DefaultTheme, Provider as PaperProvider, Avatar, ActivityIndicator } from 'react-native-paper';
import { Feather, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import DoubleTap from '../components/DoubleTap';


export default class Home extends React.Component{

  static navigationOptions = {
    header: () => {
      return(
        <View style={styles.headerWrap}>
          <Appbar style={styles.header}>
            <Appbar.Action icon="camera-alt"/>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image style={{width: 100, height: 60}} resizeMode='contain' source={require('../assets/logo.png')}/>
            </View>
            <Appbar.Action icon="people"/>
          </Appbar>
        </View>
      );
    }
  };

  state = {
    loading: true
  }

  async componentDidMount() {
    let posts = require('../api');
    this.setState({
      posts: posts,
      loading: false
    });
  }

  onRefresh() {
    if(this.state.refreshing) return;

    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  }

  like(i, value) {
    let { posts } = this.state;
    posts = posts.slice();
    if(typeof value === 'undefined')
      value = !posts[i].liked;
    posts[i].liked = value;
    this.setState({ posts });
  }


  render() {
    if(this.state.loading) return(<ActivityIndicator color="#000" style={{flex: 1}}/>);

    return(

      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
        {this.state.posts.map((post, i) => (
          <View key={post.id}>
            <View style={{flexDirection: 'row', padding: 10, paddingLeft: 15}}>
              <Avatar.Image size={40} source={require('../assets/rutgers-avatar.png')} />
              <View style={{justifyContent: 'center', paddingLeft: 10}}>
                <Text style={styles.bold}>{post.username}</Text>
                <Text>{post.location}</Text>
              </View>
            </View>
            <DoubleTap onDoubleTap={() => this.like(i, true)}>
              <Image
                source={{uri: post.image}}
                style={{width: '100%', paddingTop: '100%', position: 'absolute'}}
                resizeMode='cover'
                blurRadius={30}
              />
              <Image
                source={{uri: post.image}}
                style={{width: '100%', paddingTop: '100%'}}
                resizeMode='contain'
              />
            </DoubleTap>
            <View style={{padding: 15}}>
              <View style={styles.row}>
                <AntDesign
                  size={25}
                  name={'heart' + (post.liked ? '' : 'o')}
                  color={post.liked ? '#cc0033' : '#000'}
                  onPress={() => this.like(i)}
                />
                <Feather style={{paddingLeft: 15}} size={25} name="message-square"/>
              </View>
              <Text style={styles.p}>Liked by <Text style={styles.bold}>{post.likes} people</Text></Text>
              <Text style={styles.p}>{post.caption}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: '#fff'
  },

  header: {
    elevation: 0,
    marginTop: Constants.statusBarHeight,
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },

  p: {
    marginTop: 8
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
