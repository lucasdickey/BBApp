import {Alert} from 'react-native';

export const handleError = (error: unknown, fallbackMessage: string) => {
  console.error(error);
  if (__DEV__) {
    Alert.alert(
      'Error',
      error instanceof Error ? error.message : fallbackMessage,
    );
  }
};

export const initializeServices = async () => {
  try {
    // Basic permissions check
    // We'll only request what we absolutely need
    return true;
  } catch (error) {
    handleError(error, 'Failed to initialize app services');
    return false;
  }
};
