import React, {useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {VisualizationProps} from './types';

export const ProgressVisualization: React.FC<VisualizationProps> = ({
  phase,
  timeRemaining,
  totalTime,
  isActive,
}) => {
  const progress = new Animated.Value(timeRemaining / totalTime);

  useEffect(() => {
    if (isActive) {
      Animated.timing(progress, {
        toValue: 0,
        duration: timeRemaining * 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [phase, isActive]);

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return '#4A90E2';
      case 'holdIn':
        return '#68D391';
      case 'exhale':
        return '#F6AD55';
      case 'holdOut':
        return '#805AD5';
      default:
        return '#4A90E2';
    }
  };

  const size = 200;

  const animatedStyle = {
    height: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, size],
    }),
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.square,
          {
            width: size,
            height: size,
            borderColor: getPhaseColor(),
          },
        ]}>
        <Animated.View
          style={[
            styles.fill,
            animatedStyle,
            {backgroundColor: getPhaseColor()},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fill: {
    width: '100%',
    backgroundColor: '#4A90E2',
  },
});
