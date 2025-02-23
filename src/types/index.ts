export type BreathingPhase = 'inhale' | 'holdIn' | 'exhale' | 'holdOut';

export interface BreathingSettings {
  phaseDuration: number;
  numberOfCycles: number;
  enableSound: boolean;
  enableVoice: boolean;
  enableHaptics: boolean;
  enableVisuals: boolean;
}

export interface BreathingState {
  currentPhase: BreathingPhase;
  currentCycle: number;
  timeRemaining: number;
  isActive: boolean;
}

export type VisualizationMethod = 'text' | 'progress';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}
