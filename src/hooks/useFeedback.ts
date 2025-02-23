import {useEffect, useCallback} from 'react';
import {useSettings} from '../contexts/SettingsContext';
import {hapticService} from '../services/haptic';
import {soundService} from '../services/sound';
import {ttsService} from '../services/tts';
import {BreathingPhase} from '../types';

export const useFeedback = () => {
  const {settings} = useSettings();

  useEffect(() => {
    // Initialize sound service
    soundService.initialize();

    // Cleanup on unmount
    return () => {
      soundService.cleanup();
      ttsService.stop();
    };
  }, []);

  useEffect(() => {
    hapticService.setEnabled(settings.enableHaptics);
    soundService.setEnabled(settings.enableSound);
    ttsService.setEnabled(settings.enableVoice);
  }, [settings.enableHaptics, settings.enableSound, settings.enableVoice]);

  const triggerPhaseFeedback = useCallback(
    async (phase: BreathingPhase) => {
      if (settings.enableHaptics) {
        hapticService.phaseTransition();
      }
      if (settings.enableSound) {
        await soundService.playPhaseSound(phase);
      }
      if (settings.enableVoice) {
        await ttsService.speak(phase);
      }
    },
    [settings.enableHaptics, settings.enableSound, settings.enableVoice],
  );

  const triggerCycleComplete = useCallback(() => {
    if (settings.enableHaptics) {
      hapticService.cycleComplete();
    }
  }, [settings.enableHaptics]);

  const triggerSessionComplete = useCallback(() => {
    if (settings.enableHaptics) {
      hapticService.sessionComplete();
    }
  }, [settings.enableHaptics]);

  return {
    triggerPhaseFeedback,
    triggerCycleComplete,
    triggerSessionComplete,
  };
};
