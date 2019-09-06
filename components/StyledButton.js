import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default (props) => {
  return(
    <Button
      {...props}
      mode="contained"
      dark={true}
      color='#3798f0'
      style={[styles.noShadow, props.style]}
      uppercase={false}
    >{props.children}</Button>
  );
};

const styles = StyleSheet.create({
  noShadow: {
    elevation: 0
  }
});
