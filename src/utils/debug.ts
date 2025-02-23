import {BreathingState} from '../types';

export const DEBUG = {
  logState: (state: BreathingState) => {
    if (__DEV__) {
      console.log('Breathing State:', {
        phase: state.currentPhase,
        cycle: state.currentCycle,
        time: state.timeRemaining,
        active: state.isActive,
      });
    }
  },

  checkPerformance: () => {
    if (__DEV__) {
      const start = Date.now();
      return () => {
        const duration = Date.now() - start;
        if (duration > 16) {
          // Log if frame takes longer than 16ms (60fps)
          console.warn(`Performance warning: Operation took ${duration}ms`);
        }
      };
    }
    return () => {};
  },
};
