import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class DoubleTap extends React.Component{
  static defaultProps = {
    onDoubleTap: () => {}
  }

  state = {
    showLike: false
  }
  lastPress = 0

  onPress() {
    var delta = new Date().getTime() - this.lastPress;

    if(delta < 200) {
      // double tap happend
      this.props.onDoubleTap();
      // animate heart
      // this is a very bad
      // way do to an animation
      this.setState({ showLike: true });
      this.timeout = setTimeout(() => {
        this.setState({ showLike: false });
      }, 200);
    }

    this.lastPress = new Date().getTime();
  }


  componentWillUnmount() {
    if(this.timeout)
      clearInterval(this.timeout);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress.bind(this)}
        activeOpacity={1}
      >
        <View style={this.state.showLike ? styles.like : styles.hide}>
          <MaterialCommunityIcons size={150} name='heart' color='#fff'/>
        </View>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  rect: {
    width: 200,
    height: 200,
    backgroundColor: "tomato",
  },

  like: {
    position: 'absolute',
    zIndex: 2000,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  hide: {
    display: 'none'
  }
});
