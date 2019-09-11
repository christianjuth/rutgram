import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Avatar as PaperAvatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

function Avatar(props) {
  let createCircleStyle = (size) => {
    return {
      height: size,
      width: size,
      borderRadius: size/2
    };
  };

  let size = props.size || 50,
      spacerSize = size * 1.08,
      gradientSize = size * 1.15;

  return(
    <LinearGradient
      colors={['#12C2E9', '#C471ED', '#F64F59']}
      style={[styles.gradient, createCircleStyle(gradientSize)]}
    >
      <View style={[styles.spacer, createCircleStyle(spacerSize)]}>
        <PaperAvatar.Image {...props} size={size}/>
      </View>
    </LinearGradient>

  );
}

Avatar.propTypes = {
  size: PropTypes.number
};

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

export default Avatar;
