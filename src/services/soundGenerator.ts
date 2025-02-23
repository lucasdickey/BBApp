import {Audio} from 'expo-av';
import {FREQUENCIES, CHORD_DURATION, createChord} from '../constants/sounds';
import {BreathingPhase} from '../types';

class SoundGenerator {
  private sounds: Partial<Record<BreathingPhase, Audio.Sound>> = {};
  private volume: number = 0.5;

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    // Update volume for all existing sounds
    Object.values(this.sounds).forEach(async sound => {
      await sound?.setVolumeAsync(this.volume);
    });
  }

  async initialize() {
    try {
      // Generate all chord sounds
      for (const [phase, frequencies] of Object.entries(FREQUENCIES)) {
        const sound = await createChord(frequencies, CHORD_DURATION);
        await sound.setVolumeAsync(this.volume);
        this.sounds[phase as BreathingPhase] = sound;
      }
    } catch (error) {
      console.error('Failed to initialize sound generator:', error);
    }
  }

  async playChord(phase: BreathingPhase) {
    try {
      const sound = this.sounds[phase];
      if (sound) {
        await sound.setPositionAsync(0);
        await sound.playAsync();
      }
    } catch (error) {
      console.error(`Failed to play ${phase} chord:`, error);
    }
  }

  async cleanup() {
    for (const sound of Object.values(this.sounds)) {
      await sound?.unloadAsync();
    }
    this.sounds = {};
  }
}

export const soundGenerator = new SoundGenerator();
