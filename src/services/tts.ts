import * as Speech from 'expo-speech';
import {BreathingPhase} from '../types';

class TTSService {
  private isEnabled: boolean = true;

  private phaseMessages: Record<BreathingPhase, string> = {
    inhale: 'Breathe in',
    holdIn: 'Hold your breath',
    exhale: 'Breathe out',
    holdOut: 'Hold',
  };

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  async speak(phase: BreathingPhase) {
    if (!this.isEnabled) return;

    try {
      await Speech.speak(this.phaseMessages[phase], {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.9,
      });
    } catch (error) {
      console.error('TTS error:', error);
    }
  }

  async stop() {
    await Speech.stop();
  }
}

export const ttsService = new TTSService();
