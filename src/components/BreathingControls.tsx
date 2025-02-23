import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import {useSettings} from '../contexts/SettingsContext';
import {soundGenerator} from '../services/soundGenerator';
import {VisualizationMethod} from '../types';

const encouragementMessages = [
  'Great job! Keep breathing mindfully.',
  "You're doing amazing! Feel the calm.",
  'Excellent work on your breathing practice!',
  'Wonderful! Your mind and body thank you.',
  "Perfect! You're mastering box breathing.",
];

interface BreathingControlsProps {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  currentCycle: number;
  totalCycles: number;
  showEncouragement: boolean;
}

export const BreathingControls: React.FC<BreathingControlsProps> = ({
  isActive,
  onStart,
  onPause,
  onResume,
  onReset,
  currentCycle,
  totalCycles,
  showEncouragement,
}) => {
  const {settings, updateSettings, activeMethod, setActiveMethod} =
    useSettings();
  const [volume, setVolume] = React.useState(0.5);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    soundGenerator.setVolume(value);
  };

  const toggleMethod = (method: VisualizationMethod) => {
    setActiveMethod(method);
  };

  const randomEncouragement =
    encouragementMessages[
      Math.floor(Math.random() * encouragementMessages.length)
    ];

  return (
    <View style={styles.container}>
      {showEncouragement && (
        <Text style={styles.encouragementText}>{randomEncouragement}</Text>
      )}

      <View style={styles.cycleCounter}>
        <Text style={styles.cycleText}>
          Cycle {currentCycle} of {totalCycles}
        </Text>
      </View>

      <View style={styles.mainControls}>
        {!isActive ? (
          <TouchableOpacity style={styles.button} onPress={onStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={onPause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={onReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingRow}>
          <Text>Volume</Text>
          <Slider
            style={styles.slider}
            value={volume}
            onValueChange={handleVolumeChange}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  encouragementText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4A90E2',
  },
  cycleCounter: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cycleText: {
    fontSize: 16,
    color: '#4A5568',
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#E53E3E',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsContainer: {
    marginTop: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
  },
});
