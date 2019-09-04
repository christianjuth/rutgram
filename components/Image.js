import React from 'react';
import { Image, View } from 'react-native';

export default (props) => {
  return(
    <View>
      <Image
        {...props}
        style={{width: '100%', paddingTop: '100%', position: 'absolute'}}
        resizeMode='cover'
        blurRadius={30}
      />
      <Image
        {...props}
        style={{width: '100%', paddingTop: '100%'}}
        resizeMode='contain'
      />
    </View>
  );
}
