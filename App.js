import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer, { initialState } from './redux/reducer';

import WithAuth from './screens/WithAuth';
const store = createStore(reducer, initialState, applyMiddleware(thunk));

global.endpoint = 'https://api-useast.graphcms.com/v1/ck041h6kf0eri01bx3rtqe0du/master';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f6f6f6',
    accent: '#fff'
  }
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }

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
