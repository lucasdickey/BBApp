import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {BreathingControls} from '../components/BreathingControls';
import {TextVisualization} from '../components/visualizations/TextVisualization';
import {ProgressVisualization} from '../components/visualizations/ProgressVisualization';
import useBreathingTimer from '../hooks/useBreathingTimer';
import {useSettings} from '../contexts/SettingsContext';

export const BreathingScreen: React.FC = () => {
  const {activeMethod} = useSettings();
  const [showEncouragement, setShowEncouragement] = useState(false);
  const {
    state,
    startBreathing,
    pauseBreathing,
    resumeBreathing,
    resetBreathing,
  } = useBreathingTimer();

  const renderVisualization = () => {
    const props = {
      phase: state.currentPhase,
      timeRemaining: state.timeRemaining,
      totalTime: 4,
      isActive: state.isActive,
    };

    switch (activeMethod) {
      case 'text':
        return <TextVisualization {...props} />;
      case 'progress':
        return <ProgressVisualization {...props} />;
      default:
        return <TextVisualization {...props} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderVisualization()}
      <BreathingControls
        isActive={state.isActive}
        onStart={startBreathing}
        onPause={pauseBreathing}
        onResume={resumeBreathing}
        onReset={resetBreathing}
        currentCycle={state.currentCycle}
        totalCycles={4}
        showEncouragement={showEncouragement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F9FC',
  },
});
