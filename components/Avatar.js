import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default (props) => {

  let createCircleStyle = (size) => {
    return {
      height: size,
      width: size,
      borderRadius: size/2
    };
  }

  let size = props.size || 50,
      spacerSize = size * 1.08,
      gradientSize = size * 1.15;

  return(
    <LinearGradient
      colors={['#12C2E9', '#C471ED', '#F64F59']}
      style={[styles.gradient, createCircleStyle(gradientSize)]}
    >
      <View style={[styles.spacer, createCircleStyle(spacerSize)]}>
        <Avatar.Image {...props} size={size}/>
      </View>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  spacer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
