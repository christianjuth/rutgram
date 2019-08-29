import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default class DoubleTap extends React.Component{
  static defaultProps = {
    onDoubleTap: () => {}
  }

  state = {
    lastPress: 0
  }

  onPress() {
    var delta = new Date().getTime() - this.state.lastPress;

    if(delta < 200) {
      // double tap happend
      this.props.onDoubleTap();
    }

    this.setState({
      lastPress: new Date().getTime()
    })
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress.bind(this)}
        activeOpacity={1}
      >
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
});
