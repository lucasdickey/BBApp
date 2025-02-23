import {Audio} from 'expo-av';
import {soundGenerator} from './soundGenerator';
import {BreathingPhase} from '../types';

class SoundService {
  private isEnabled: boolean = true;

  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });

      // Initialize sound generator
      await soundGenerator.initialize();
    } catch (error) {
      console.error('Failed to initialize sound service:', error);
    }
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  async playPhaseSound(phase: BreathingPhase) {
    if (!this.isEnabled) return;
    await soundGenerator.playChord(phase);
  }

  async cleanup() {
    await soundGenerator.cleanup();
  }
}

const createChord = async (frequencies: number[], duration: number) => {
  const audioContext = new AudioContext();
  const buffer = audioContext.createBuffer(1, duration * 44100, 44100);

  // ... buffer creation code

  const blob = new Blob([buffer], {type: 'audio/wav'});
  return await Audio.Sound.createAsync(
    {uri: URL.createObjectURL(blob)},
    {shouldPlay: false},
  );
};

export const soundService = new SoundService();
