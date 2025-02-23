import {useState, useEffect, useCallback} from 'react';
import {BreathingPhase, BreathingState} from '../types';
import {useSettings} from '../contexts/SettingsContext';
import {useFeedback} from './useFeedback';

const useBreathingTimer = () => {
  const {settings} = useSettings();
  const {triggerPhaseFeedback, triggerCycleComplete, triggerSessionComplete} =
    useFeedback();

  const [state, setState] = useState<BreathingState>({
    currentPhase: 'inhale',
    currentCycle: 1,
    timeRemaining: settings.phaseDuration,
    isActive: false,
  });

  const nextPhase = useCallback(async () => {
    setState(prev => {
      const phases: BreathingPhase[] = [
        'inhale',
        'holdIn',
        'exhale',
        'holdOut',
      ];
      const currentIndex = phases.indexOf(prev.currentPhase);
      const nextIndex = (currentIndex + 1) % phases.length;

      // If we've completed a full cycle
      if (nextIndex === 0) {
        if (prev.currentCycle >= settings.numberOfCycles) {
          triggerSessionComplete();
          return {...prev, isActive: false};
        }
        triggerCycleComplete();
        return {
          ...prev,
          currentPhase: phases[nextIndex],
          currentCycle: prev.currentCycle + 1,
          timeRemaining: settings.phaseDuration,
        };
      }

      const nextPhase = phases[nextIndex];
      triggerPhaseFeedback(nextPhase);

      return {
        ...prev,
        currentPhase: nextPhase,
        timeRemaining: settings.phaseDuration,
      };
    });
  }, [
    settings.numberOfCycles,
    settings.phaseDuration,
    triggerPhaseFeedback,
    triggerCycleComplete,
    triggerSessionComplete,
  ]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state.isActive && state.timeRemaining > 0) {
      timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    } else if (state.timeRemaining === 0 && state.isActive) {
      nextPhase();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state.isActive, state.timeRemaining, nextPhase]);

  const startBreathing = () => {
    setState({
      currentPhase: 'inhale',
      currentCycle: 1,
      timeRemaining: settings.phaseDuration,
      isActive: true,
    });
  };

  const pauseBreathing = () => {
    setState(prev => ({...prev, isActive: false}));
  };

  const resumeBreathing = () => {
    setState(prev => ({...prev, isActive: true}));
  };

  const resetBreathing = () => {
    setState({
      currentPhase: 'inhale',
      currentCycle: 1,
      timeRemaining: settings.phaseDuration,
      isActive: false,
    });
  };

  return {
    state,
    startBreathing,
    pauseBreathing,
    resumeBreathing,
    resetBreathing,
  };
};

export default useBreathingTimer;
