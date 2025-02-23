/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {SettingsProvider} from './src/contexts/SettingsContext';
import {BreathingScreen} from './src/screens/BreathingScreen';
import {ErrorBoundary} from './src/components/ErrorBoundary';

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SettingsProvider>
          <BreathingScreen />
        </SettingsProvider>
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
});

export default App;
