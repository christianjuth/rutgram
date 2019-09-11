import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

function StyledButton(props) {
  return(
    <Button
      mode='contained'
      {...props}
      dark={true}
      color={props.mode !== 'outlined' ? '#3798f0' : '#000'}
      style={[styles.noShadow, props.style]}
      uppercase={false}
    >{props.children}</Button>
  );
}

StyledButton.propTypes = {
  mode: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
};

const styles = StyleSheet.create({
  noShadow: {
    elevation: 0
  }
});

export default StyledButton;
