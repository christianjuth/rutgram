import React, { Fragment } from 'react';
import { Image } from 'react-native';

function StyledImage(props) {
  return(
    <Fragment>
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
    </Fragment>
  );
}

export default StyledImage;
