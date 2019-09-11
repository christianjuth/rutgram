import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

function Icon(props) {

  let icons = {
    'person':   require('../assets/icons/person.png'),
    'person-o': require('../assets/icons/person-o.png'),
    'heart':   require('../assets/icons/heart.png'),
    'heart-o': require('../assets/icons/heart-o.png'),
    'heart-red':   require('../assets/icons/heart-red.png'),
    'add-box':   require('../assets/icons/add-box.png'),
    'add-box-o': require('../assets/icons/add-box-o.png'),
    'search':   require('../assets/icons/search.png'),
    'search-o': require('../assets/icons/search-o.png'),
    'home':   require('../assets/icons/home.png'),
    'home-o':   require('../assets/icons/home-o.png'),
    'message-o':   require('../assets/icons/message-o.png'),
  };

  // adjust to match expo icons
  let size = props.size + 2,
      height = size,
      width = size,
      Wrap = props.onPress ? TouchableOpacity : View;

  return(
    <Wrap
      style={[ styles.iconWrap, { height, width }, props.style ]}
      onPress={props.onPress}
      activeOpacity={0.7}
    >
      <Image resizeMode='contain' style={styles.icon} source={icons[props.name]} />
    </Wrap>
  );
}

Icon.propTypes = {
  name: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  size: PropTypes.number
};

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon: {
    flex: 1,
    height: '100%',
    width: '100%'
  }
});

export default Icon;
