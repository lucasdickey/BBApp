import {Audio} from 'expo-av';
import {BreathingPhase} from '../types';

export const FREQUENCIES = {
  inhale: [261.63, 329.63, 392.0], // C major chord
  holdIn: [293.66, 369.99, 440.0], // D major chord
  exhale: [329.63, 415.3, 493.88], // E major chord
  holdOut: [349.23, 440.0, 523.25], // F major chord
};

export const CHORD_DURATION = 0.5;

const generateTone = (frequency: number, duration: number): number[] => {
  const sampleRate = 44100;
  const samples = duration * sampleRate;
  const buffer = new Array(samples);

  for (let i = 0; i < samples; i++) {
    buffer[i] = Math.sin((2 * Math.PI * frequency * i) / sampleRate);
  }

  return buffer;
};

export const createChord = async (
  frequencies: number[],
  duration: number,
): Promise<Audio.Sound> => {
  const sampleRate = 44100;
  const samples = duration * sampleRate;
  const buffer = new Array(samples).fill(0);

  frequencies.forEach(freq => {
    const tone = generateTone(freq, duration);
    for (let i = 0; i < samples; i++) {
      buffer[i] += tone[i] / frequencies.length;
    }
  });

  const pcmData = buffer.map(sample => sample * 32767);
  const audioBuffer = new ArrayBuffer(pcmData.length * 2);
  const view = new DataView(audioBuffer);
  pcmData.forEach((sample, index) => {
    view.setInt16(index * 2, sample, true);
  });

  return await Audio.Sound.createAsync(
    {uri: URL.createObjectURL(new Blob([audioBuffer], {type: 'audio/wav'}))},
    {shouldPlay: false},
  );
};

// Simple mapping of phases to audio file names
export const SOUND_FILES: Record<BreathingPhase, string> = {
  inhale: 'inhale.mp3',
  holdIn: 'hold.mp3',
  exhale: 'exhale.mp3',
  holdOut: 'hold.mp3',
};
