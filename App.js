import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, DefaultTheme, Provider as PaperProvider, Avatar, BottomNavigation, ActivityIndicator } from 'react-native-paper';
import Constants from 'expo-constants';
import { withNavigation } from 'react-navigation';

import AppNavigator from './navigation/AppNavigator';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import reducer, { initialState } from './reducer';

import AuthLoadingScreen from './screens/Auth/AuthLoadingScreen';
const store = createStore(reducer, initialState, applyMiddleware(thunk));

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f6f6f6',
    accent: '#fff'
  }
};

class WithAuth extends React.Component{
  render() {
    if(!this.props.profileId){
      return(
        <AuthLoadingScreen/>
      );
    }

    return(
      <AppNavigator/>
    );
  }
}
const mapStateToProps = state => {
  return ({
    profileId: state.profileId
  });
}
WithAuth = connect(mapStateToProps)(WithAuth)

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  let state = store.getState();

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }

  // else if(!state.profileId) {
  //   return(
  //     <Provider store={store}>
  //       <AuthLoadingScreen/>
  //     </Provider>
  //   );
  // }

  else {
    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <View style={styles.container}>
            <WithAuth/>
          </View>
        </Provider>
      </PaperProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
});
