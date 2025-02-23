jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-native-async-storage/async-storage');
jest.mock('expo-av');
jest.mock('expo-speech');
jest.mock('react-native-haptic-feedback');

// Use our components mock
jest.mock('./src/screens/BreathingScreen', () => ({
  BreathingScreen: () => null,
}));

jest.mock('./src/contexts/SettingsContext', () => ({
  SettingsProvider: ({children}) => children,
  useSettings: () => ({
    settings: {
      phaseDuration: 4,
      numberOfCycles: 4,
      enableSound: true,
      enableVoice: true,
      enableHaptics: true,
      enableVisuals: true,
    },
    activeMethod: 'progress',
    setActiveMethod: jest.fn(),
    updateSettings: jest.fn(),
  }),
}));
