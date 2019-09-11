import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';
import { Appbar, withTheme } from 'react-native-paper';
import Constants from 'expo-constants';

function Header(props) {
  const { colors } = props.theme;
  return(
    <View style={{backgroundColor: colors.primary}}>
      <Appbar style={styles.header}>
        <Appbar.Action/>
        <View style={styles.logoWrap}>
          <Image
            style={styles.logo}
            resizeMode='contain'
            source={require('../../assets/logo.png')}
          />
        </View>
        <Appbar.Action icon="people"/>
      </Appbar>
    </View>
  );
}

Header.propTypes = {
  theme: PropTypes.object
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    marginTop: Constants.statusBarHeight,
    height: 56,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },

  logoWrap: {
    flex: 1,
    alignItems: 'center'
  },

  logo: {
    width: 100,
    height: 60
  }
});

export default withTheme(Header);
