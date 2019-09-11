import React from 'react';
import AppNavigator from '../navigation/AppNavigator';
import AuthScreen from '../screens/AuthScreen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function WithAuth(props) {
  if(!props.profileId){
    return(
      <AuthScreen/>
    );
  }

  return(
    <AppNavigator/>
  );
}

WithAuth.propTypes = {
  profileId: PropTypes.string
};

const mapStateToProps = state => {
  return ({
    profileId: state.profileId
  });
};

export default connect(mapStateToProps)(WithAuth);
