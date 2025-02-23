import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {VisualizationProps} from './types';

const phaseMessages = {
  inhale: 'Breathe In',
  holdIn: 'Hold',
  exhale: 'Breathe Out',
  holdOut: 'Hold',
};

export const TextVisualization: React.FC<VisualizationProps> = ({
  phase,
  timeRemaining,
  isActive,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.phaseText}>{phaseMessages[phase]}</Text>
      {isActive && (
        <Text style={styles.timerText}>{timeRemaining} seconds</Text>
      )}
      {!isActive && (
        <Text style={styles.instructionText}>
          Press start to begin breathing
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  phaseText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 24,
    opacity: 0.8,
  },
  instructionText: {
    fontSize: 18,
    opacity: 0.6,
  },
});
