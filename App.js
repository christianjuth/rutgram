import { AppLoading } from 'expo';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Appbar, DefaultTheme, Provider as PaperProvider, Avatar, BottomNavigation, ActivityIndicator } from 'react-native-paper';

import AppNavigator from './navigation/AppNavigator';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    accent: '#fff',
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
  } else {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
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
    backgroundColor: '#fff',
  },
});
